import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AzureAdDemoService } from '../azure-ad-demo.service';
const GRAPH_ENDPOINT = 'Enter_the_Graph_Endpoint_Here/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile?:Profile;
  profilePic?:SafeResourceUrl;
  constructor(private azureAdDemoService: AzureAdDemoService, private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.getProfile();
    this.getProfilePic();
    const xyz = localStorage.getItem('token');
    // console.log("xyz",xyz)
  }


  getProfile()
  {
    this.azureAdDemoService.getUserProfile()
    .subscribe(profileInfo=>{
      this.profile=profileInfo;
    })
  }

  getProfilePic()
  {
    this.azureAdDemoService.getProfilePic()
    .subscribe(response=>{
      var urlCreator = window.URL || window.webkitURL
      this.profilePic = this.domSanitizer.bypassSecurityTrustResourceUrl
      (urlCreator.createObjectURL(response));
    })
  }
}
