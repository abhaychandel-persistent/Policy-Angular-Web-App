import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatListModule } from '@angular/material/list';
import { MatTableModule  } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MSAL_INTERCEPTOR_CONFIG, MsalGuard, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AzureAdDemoService } from './azure-ad-demo.service';
import { EmployeeService } from './employee.service';
import { environment } from 'src/environments/environment';
import { CreatePolicyComponent } from './create-policy/create-policy.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);
  protectedResourceMap.set('https://appservice-webapi-1072.azurewebsites.net/policies', ['d4dbe9b4-e1f0-47a0-bbf7-7f8c8d1fec7f/.default']);
  protectedResourceMap.set('http://localhost:8080/policies', ['d4dbe9b4-e1f0-47a0-bbf7-7f8c8d1fec7f/.default']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    CreatePolicyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MsalModule.forRoot( new PublicClientApplication
      (
        {
      auth: {
        clientId: environment.auth.clientId, // Application (client) ID from the app registration
        authority: environment.auth.authority, // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
        redirectUri: environment.auth.redirectUri// This is your redirect URI
        // redirectUri: ' https://appservice-webapp-1072.azurewebsites.net/aswebapp/auth/redirect'
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }
    ),
    {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      authRequest: {
        scopes: ['user.read']
      }
  }, {
    interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
    protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
    ])
  })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  {
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: MSALInterceptorConfigFactory
  },
  MsalGuard, AzureAdDemoService, EmployeeService],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }


export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
}
