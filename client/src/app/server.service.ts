import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

    constructor(private http: HttpClient) {
    }

    private async request(method: string, url: string, data?: any) {
      const result = this.http.request(method, url, {
        body: data,
        responseType: 'json',
        observe: 'body',
        headers: {}
      });
      return new Promise((resolve, reject) => {
        result.subscribe(resolve, reject);
      });
    }

    getShareholders() {
      return this.request('GET', `${environment.serverUrl}/shareholders`);
    }

    createShareholder(shareholder: any) {
      return this.request('POST', `${environment.serverUrl}/shareholder`, shareholder);
    }

    updateShareholder(shareholder: any) {
      return this.request('PUT', `${environment.serverUrl}/shareholder/${shareholder.id}`, shareholder);
    }

    deleteShareholder(shareholder: any) {
      return this.request('DELETE', `${environment.serverUrl}/shareholder/${shareholder.id}`);
    }
}