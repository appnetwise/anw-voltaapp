pipeline {
    agent any
    stages {
        stage('Checkout Repository') {
            steps {
                checkout scm
            }
        }
        stage('Setup Node.js') {
            steps {
                script {
                    if (isUnix()) {
                        env.PATH = "${tool 'Node.js'}/bin:${env.PATH}"
                    } else {
                        env.PATH = "${tool 'Node.js'};${env.PATH}"
                    }
                }
            }
        }
        stage('Install Ionic CLI') {
            steps {
                bat 'npm install -g @ionic/cli'
            }
        }
        stage('Install Cordova') {
            steps {
                bat '''
                    npm install -g cordova
                    npm install -g cordova-res
                '''
            }
        }
        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Add Remove Android Platform') {
            steps {
                bat '''
                    dir
                    ionic build
                    ionic cordova platform rm android
                    ionic cordova platform add android
                '''
            }
        }
       stage('Upload Google Services JSON') {
            steps {
                archiveArtifacts artifacts: 'google-services.json', fingerprint: true
            }
        }
        stage('Download Google Services JSON') {
            steps {
                unarchive mapping: ['google-services': './platforms/android/app']
            }
        }
        stage('Platform Files') {
            steps {
                bat 'dir /s /b $WORKSPACE/platforms/android/platform_www'
            }
        }
        stage('www Files') {
            steps {
                bat 'dir /s /b $WORKSPACE/www'
            }
        }
        stage('Copy cordova.js') {
            steps {
                bat 'copy $WORKSPACE/platforms/android/platform_www/cordova.js $WORKSPACE/www/'
            }
        }
        stage('Add cordova.js reference') {
          steps {
            bat 'powershell -command "(Get-Content \"$WORKSPACE/www/index.html\") -replace \'</html>\', \'<script src=\"cordova.js\"></script></html>\' | Set-Content \"$WORKSPACE/www/index.html\""'
          }
        }

        stage('Build APK') {
            steps {
                bat 'cordova build android'
            }
        }
        stage('Upload APK') {
            steps {
                archiveArtifacts artifacts: 'platforms/android/app/build/outputs/apk/debug/app-debug.apk', fingerprint: true
            }
        }
        stage('Trigger BrowserStack Mobile App Tests') {
            steps {
                script {
                    def payload = '{"source_repo": "appnetwise/anw-voltaapp", "run_id": "${BUILD_ID}"}'
                    def response = httpRequest(
                        contentType: 'APPLICATION_JSON',
                        httpMode: 'POST',
                        requestBody: payload,
                        responseHandle: 'NONE',
                        url: 'https://api.github.com/repos/appnetwise/anw-app-browserstack/dispatches',
                        validResponseCodes: '200'
                    )
                    echo "Triggered BrowserStack Mobile App Tests: ${response.status}"
                }
            }
        }
    }
}
