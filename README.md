# AppServiceWebapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.0.


This App demonstrates how to use MSAL Angular v2 to login, logout, conditionally render components to authenticated users, and acquire an access token for a protected resource such as Microsoft Graph. 

This App demonstrates the following MSAL Angular concepts:

Configuration
Login
Logout
Protecting a route
Acquiring an access token and calling Microsoft Graph Api.
Showing user logged in details on click of Profile.
Showing list of Policies and allowing to create a new Policy. And the newly created Policy gets appended to the Existing policy list.

Getting Started
Prerequisites
Node.js must be installed to run this sample.
Need to install Angular CLI. Reference Link https://angular.io/cli


Setup
Register a new application in the Azure Portal. Ensure that the application is enabled for the authorization code flow with PKCE. This will require that you redirect URI configured in the portal is of type SPA.
Clone this repository git clone https://github.com/abhaychandel-persistent/policy-webapp
Open the /src/app/app.module.ts file and provide the required configuration values.
Replace the string "Enter_the_Application_Id_Here" with your app/client ID on AAD Portal.
Replace the string "Enter_the_Cloud_Instance_Id_HereEnter_the_Tenant_Info_Here" with "https://login.microsoftonline.com/common/"
ℹ️ if you would like to sign-in users with your tenant only, use your tenant ID instead of common.

Replace the string "Enter_the_Redirect_Uri_Here" with the redirect uri you setup on AAD Portal.
Replace the string "Enter_the_Graph_Endpoint_Herev1.0/me" with "https://graph.microsoft.com/v1.0/me"


API endpoint for showing the List of Policies: 'http://localhost:8080/policies' Method: GET

API endpoint for Creating a new Policy: 'http://localhost:8080/policies' Method: POST

To get some basic understanding of how Authentication and Authorization is happening please vist this link https://learn.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-overview.

Here is a sample tutorial which was followed to implement the Auth flow https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-angular-auth-code.


On the command line, navigate to the root of the repository, and run npm install to install the project dependencies via npm.

Note: Make sure Before running the Angular Application run the Java application.
Please find the link for backend code https://github.com/abhaychandel-persistent/policy-webapi

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




