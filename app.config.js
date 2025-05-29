export default {
  expo: {
    name: "FastHack",
    slug: "fasthack",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "fasthack",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "app.rork.fasthack",
      googleServicesFile: "./GoogleService-Info.plist"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "app.rork.fasthack",
      googleServicesFile: "./google-services.json"
    },
    web: {
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      [
        "expo-router",
        {
          origin: "https://rork.app/"
        }
      ],
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ],
      [
        "expo-auth-session",
        {
          "schemes": ["fasthack"]
        }
      ],
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": "209139657307-inmk9n77std92ceo573g59bpqv2brfjr.apps.googleusercontent.com"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      googleClientId: {
        ios: "209139657307-inmk9n77std92ceo573g59bpqv2brfjr.apps.googleusercontent.com",
        web: "209139657307-mhub0fq3afcfftess5enu2qrsvap34lp.apps.googleusercontent.com"
      }
    }
  }
};