import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Profile } from './profile.model';


const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_PIC = 'https://graph.microsoft.com/v1.0/me/photo/$value';
// const REPORTS_API_BASE_URI='https://localhost:44320/api/'

@Injectable({
  providedIn: 'root'
})
export class AzureAdDemoService {

  payloadToken: any;
  isUserLoggedIn:Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get('/assets/employees.json');
  }

  getUserProfile()
  {
    return this.http.get<Profile>(GRAPH_ENDPOINT)
  }
  getProfilePic()
  {
    return this.http.get(GRAPH_ENDPOINT_PIC,{responseType:'blob'});
  }
}
