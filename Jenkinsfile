pipeline {
    agent {
        label "ubuntu-latest"
    }
    stages {
        stage('Checkout Repository') {
            steps {
                checkout scm
            }
        }
        stage('Setup Node.js') {
            steps {
                script {
                    env.PATH = "${tool 'Node.js'}/bin:${env.PATH}"
                }
            }
        }
        stage('Install Ionic CLI') {
            steps {
                sh 'npm install -g @ionic/cli'
            }
        }
        stage('Install Cordova') {
            steps {
                sh '''
                    npm install -g cordova
                    npm install -g cordova-res
                '''
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Upload Google Services JSON') {
            steps {
                archiveArtifacts artifacts: 'google-services.json', fingerprint: true
            }
        }
        stage('Download Google Services JSON') {
            steps {
                unarchive mapping: ['google-services': './platforms/android/app'], allowEmptyArchive: true
            }
        }
        stage('Add Remove Android Platform') {
            steps {
                sh '''
                    ls
                    pwd
                    ionic build
                    ionic cordova platform rm android
                    ionic cordova platform add android
                '''
            }
        }
        stage('Platform Files') {
            steps {
                sh 'ls -R $WORKSPACE/platforms/android/platform_www'
            }
        }
        stage('www Files') {
            steps {
                sh 'ls -R $WORKSPACE/www'
            }
        }
        stage('Copy cordova.js') {
            steps {
                sh 'cp $WORKSPACE/platforms/android/platform_www/cordova.js $WORKSPACE/www/'
            }
        }
        stage('Add cordova.js reference') {
            steps {
                sh 'sed -i \'s#</html>#<script src="cordova.js"></script></html>#\' $WORKSPACE/www/index.html'
            }
        }
        stage('Build APK') {
            steps {
                sh 'cordova build android'
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
