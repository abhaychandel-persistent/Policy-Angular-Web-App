// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  postLogoutUrl: 'http://localhost:4200',
  // apiEndPoint: 'https://appservice-webapi-1072.azurewebsites.net/policies',
  apiEndPoint: 'http://localhost:8080/policies',
  baseURL: "http://localhost:8080/",

  auth: {
    clientId: 'd4dbe9b4-e1f0-47a0-bbf7-7f8c8d1fec7f', // Application (client) ID from the app registration
    authority: 'https://login.microsoftonline.com/1972f4ea-4dbc-4475-8204-536e6cd8a3ec', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
    redirectUri: 'http://localhost:4200'// This is your redirect URI
    // redirectUri: ' https://appservice-webapp-1072.azurewebsites.net/aswebapp/auth/redirect'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
