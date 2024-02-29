
# anw-voltacab

anw-voltacab is hybrid mobile application


## Installation

Install dependancy with npm

```bash
  npm i
```
Install ionic globally
``` bash
npm i -g @ionic/cli
```

Start the application
```bash
ionic serve
```
## Generating APK file
### On windows machine , android and java should be installed
#### Java Development Kit (JDK)
  https://www.oracle.com/java/technologies/downloads/
##### Android Studio 
  https://developer.android.com/studio
#### Set JAVA_HOME and ANDROID_HOME environment variables in Windows
```
Set JAVA_HOME:
Under "System variables," click "New."
In the "Variable name" field, type JAVA_HOME.
In the "Variable value" field, enter the full path to your JDK installation directory.
For example, if your JDK is installed in C:\Program Files\Java\jdk-19, enter that path.
Click "OK" to save the changes.

```
```
Set ANDROID_HOME:
Variable name: ANDROID_HOME
Variable value: Full path to your Android SDK installation directory.
For example, if your Android SDK is installed in C:\Users\<username>\AppData\Local\Android\Sdk, enter that path.
```
#### Install Gradle
https://gradle.org/next-steps/?version=8.6&format=bin

Extaract bindary files at this location  C:\Gradle\gradle-8.6

Add the location in system env path C:\Gradle\gradle-8.6-bin\gradle-8.6\bin

Install cordova globally
```
npm i -g cordova
npm i -g cordova-res
```
Add android platform
```bash
ionic platform add android
```
### if you are using firebase in your project so make sure google-services.json file should be copied into your project 
```bash
<your project dir>/anw-voltaapp/platforms/android/app
```
Build for android platform
```bash
cordova platform build android

```
