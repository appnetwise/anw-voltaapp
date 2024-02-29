
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
