import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private client: HttpClient) { }

  //postLogin : return a boolean
  login(login: string, password: string): Observable<any> {
    return this.client.get<any>(environment.apiUrl + `/login?Email=${login}&Password=${password}`);
  }
}
