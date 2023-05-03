import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus, PopupRequest, RedirectRequest, SilentRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AzureAdDemoService } from './azure-ad-demo.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app-service-webapp';
  isUserLoggedIn: boolean = false;
  isIframe = false;
  samplePayload;
  private readonly _destroy = new Subject<void>();




  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
  private msalBroadcastService: MsalBroadcastService,
  private authService: MsalService, private azureAdDemoService: AzureAdDemoService) {

  }
  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

   this.msalBroadcastService.inProgress$.pipe(
    filter((interactionStatus: InteractionStatus) =>
    interactionStatus == InteractionStatus.None
    ),
    takeUntil(this._destroy)
   ).subscribe(
    x=> {
      this.isUserLoggedIn = this.authService.instance.getAllAccounts().length>0
      this.azureAdDemoService.isUserLoggedIn.next(this.isUserLoggedIn)
    }
   )

   this.msalBroadcastService.msalSubject$
   .pipe(
     filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
     takeUntil(this._destroy)
   )
   .subscribe((result: EventMessage) => {
   this.samplePayload = result.payload;
   localStorage.setItem('token', this.samplePayload.accessToken);
  //  sessionStorage.setItem('tokenNew', this.samplePayload.accessToken)

   });

  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  login(){
    console.log("*******3333",this.msalGuardConfig.authRequest);
    if(this.msalGuardConfig.authRequest){
      // let accounts = this.authService.instance.getAllAccounts();
      // console.log("*******3333",this.msalGuardConfig.authRequest);
      // this.authService.instance.setActiveAccount(accounts[0]);
      //  this.msalGuardConfig.authRequest = this.authService.instance.getAllAccounts()[0];
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
      // this.authService.acquireTokenPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
      //   .subscribe((response: any) => {
      //     console.log("*******3333",response);
      //     console.log("*******113333",response.accessToken);
      //     // this.authService.instance.setActiveAccount(response.account);
      //     console.log(response.accessToken);
      //     console.log(this.authService.instance.getAllAccounts());
      //   });
    }
    else{
      this.authService.loginRedirect();
    }
  }

  logout(){
    this.authService.logoutRedirect({
      postLogoutRedirectUri: environment.postLogoutUrl
    })
  }

}

