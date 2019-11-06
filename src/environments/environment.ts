// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:  {
    apiKey: "AIzaSyD3W-GpggSqQ86r3cqEkd1tLiqkenvGKog",
    authDomain: "rtdn-39bbf.firebaseapp.com",
    databaseURL: "https://rtdn-39bbf.firebaseio.com",
    projectId: "rtdn-39bbf",
    storageBucket: "rtdn-39bbf.appspot.com",
    messagingSenderId: "977602378278",
    appId: "1:977602378278:web:c32ef6e9755c621dd304e7",
    measurementId: "G-3YP6YP95FJ"
  },
  SERVER_BASE_URL: "api/",
  localstorage_key: 'loggedUser'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
