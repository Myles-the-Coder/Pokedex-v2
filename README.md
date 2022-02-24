# Sermo
![Sermo_Logo - Copy](https://user-images.githubusercontent.com/76969330/152239441-96a85da1-d3fd-4063-8812-39463ad2ba35.png)

Sermo is a mobile chat application built using React Native, Expo, Gifted Chat, and Firebase. Users can choose a background color and username of their choosing before entering the application's chat screen. Upon granting permission, users can send pictures from their camera roll or directly take pictures using their device's camera. Users also have the ability to quickly send their location to another user. 

Initial 1.0 Version Duration: September 2021 - October 2022

## 🧐About

This project was built for the purpose of gaining more expiernce with mobile development via React Native. 

## 💡Features

1. Responsive design
2. Fully customizable background colors
3. Access to camera roll images (optional)
4. Ability to take and send pictures
5. Quick location sharing

## ⛏️Built with

 "dependencies": {
 
    "@expo/react-native-action-sheet": "^3.13.0",
    "@react-native-async-storage/async-storage": "~1.15.0",
    "@react-native-community/masked-view": "^0.1.11",
    "@react-native-community/netinfo": "7.1.3",
    "@react-navigation/native": "^6.0.6",
    "@react-navigation/stack": "^6.0.11",
    "expo": "~44.0.0",
    "expo-camera": "^12.1.0",
    "expo-image-picker": "~12.0.1",
    "expo-location": "~14.0.1",
    "expo-status-bar": "~1.2.0",
    "firebase": "^9.6.3",
    "react": "17.0.1",
    "react-dom": "17.0.1",
    "react-firebase-hooks": "^5.0.0",
    "react-native": "0.64.3",
    "react-native-gesture-handler": "~2.1.0",
    "react-native-gifted-chat": "^0.16.3",
    "react-native-reanimated": "~2.3.1",
    "react-native-safe-area-context": "3.3.2",
    "react-native-screens": "~3.10.1",
    "react-native-web": "0.17.1",
    "react-native-wheel-color-picker": "^1.2.0",
    "react-navigation": "^4.4.4",
    "undefined": "react-native-async-storage/async-storage",
    "react-native-maps": "0.29.4",
    "expo-permissions": "~13.1.0"
  },
  
  "devDependencies": {
  
    "@babel/core": "^7.12.9",
    "metro-react-native-babel-preset": "^0.66.2",
    "react-native-dotenv": "^3.3.1"
  }

## 🏁Getting Started

These instructions will help you to setup your own copy of Sermo on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## 📚Prerequisite

#### //Necessary

- React Native
- Node & NPM
- Expo / Expo Go
- Firebase

#### //Optional

- Android Studio (Android only)
  - If you choose to use Android Studio for device emulation, please refer to the [Android Studio Docs](https://developer.android.com/studio/install) to ensure proper setup for use with Expo
- Xcode (IOS only)

## 🧰Installation

1. Clone this repo
2. Install all the dependencies listed above
3. Tweak code depending on local settings
4. Run ```npm start``` or ```expo start``` in your terminal to start local server
5. Scan the QR code provided by Expo in the terminal or development tools to load the project on a physical device. Alternatively, launch the project using an Android Studio or Xcode.


## 🚀Firebase Setup (As of Jan 2022)

1. Create a new project through the Firebase console
2. Click on Firebase Database on the lefthand side of the page, enter production mode, and select the closest Cloud Firestore location
3. Click on the cog icon next to 'Project Overview' and scroll down to the 'Your Apps' section at the bottom of the page. 
4. Click on the 'web' icon and enter the project name on the next page.
5. Add the Firebase congif settings to either your `Chat.js` file or a seperate file where it can be imported
   - Do NOT push these settings to GitHub. Make use of `react-native-dotenv` or a similar package to hide these in a `.env` file.
6. Enable anonymous signin within the 'Authentication' menu
7. Enable storge in the 'Storage' menu. This is used to store image files set as chat messages.

For further information, please refer to the [Firebase Docs](https://firebase.google.com/docs/)

## 📝Todo

-Add more functionality to chat (e.g. recording and sending voice messages)
-Adjust styling where necessary
-Improve speed of sending/recieving images between users

## 📈Future Plans

-Add additional signin options (e.g. email/password, Google, etc.)

## 🎈Usage

Sermo, like other applications such as WhatsApp, allows for communication between friends and family across the globe.

## ✍️Authors
@Myles-the-Coder - Initial Work

## 🧬Resources

- React Native Docs
- Expo Docs
- Firebase Docs
- GiftedChat GitHub repo
- Expo Camera Docs
- Expo Location Docs

## 🎉Acknowledgement
CareerFoundry
