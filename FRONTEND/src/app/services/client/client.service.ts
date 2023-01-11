import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/core/model/Client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private client: HttpClient) { }

  //GetClient : return the list of existing client
  getClients(): Observable<Client[]> {
    return this.client.get<Client[]>(environment.apiUrl + '/client', this.httpOptions);
  }

  getClient(id: number): Observable<Client> {
    return this.client.get<Client>(environment.apiUrl + '/client/' + id, this.httpOptions);
  }

  getClientFromTerm(term: string): Observable<Client[]> {
    return this.client.get<Client[]>(environment.apiUrl + '/client/term/' + term, this.httpOptions);
  }

  postClient(client: Client): Observable<Client> {
    return this.client.post<Client>(environment.apiUrl + '/client', client, this.httpOptions);
  }

  deleteClient(id: number): Observable<Client> {
    return this.client.delete<Client>(environment.apiUrl + '/client/' + id, this.httpOptions);
  }
}
