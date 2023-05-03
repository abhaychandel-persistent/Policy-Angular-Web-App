import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './app.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    const t = localStorage.getItem('token');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    console.log(this.http.get<Employee[]>(environment.apiEndPoint));
    return this.http.get<Employee[]>(environment.apiEndPoint);
  }
}
