#StalkGram React-Native

This is an Android App to download videos and images from **Instagram.**

This is an improved version of [Stalkgram](https://play.google.com/store/apps/details?id=com.instagram.instaprofile&hl=es_419)

## Use case
Just copy the link of an image in the app, and press the *FloatingActionButton* of the app.

A progress bar is going to show you how long it takes to download the file. Once the file was downloaded, you can
share it or set as profile picture.

### Run the project  
1. First, clone de Github project:  
    `git clone https://github.com/sf27/StalkGramReactNative && cd StalkGramReactNative`    
2. Run the follow command:  
    `npm install`   
3. Run the server:  
    `react-native start`  
4. Specify the Android SDK path:
    * Create the local.properties file  
    `vim android/local.properties`
    * And add two variables:  
    `sdk.dir=<DIR>/Android/adt-bundle-linux-x86_64-20130729/sdk`
    * Save the changes:  
    `:wq`
4. Run the app:  
    `react-native run-android`

### Build a release
1. Run the following command:  
    `cd android && ./gradlew assembleReleas`
2. Find the *.apk signed:  
    `StalkGramReactNative/android/app/build/outputs/apk/app-release.apk`
    
#### *Note*: This is a version of StalkGramPlus developed with React-Native.
[JavaRepo](https://github.com/sf27/StalkGramPlus)  
[KotlinRepo](https://github.com/sf27/StalkGramKotlinPlus)  
[React-Native WebSite](https://facebook.github.io/react-native/)  



