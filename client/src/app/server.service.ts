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

    getSholders() {
      return this.request('GET', `${environment.serverUrl}/sholders`);
    }

    createSholder(sholder: any) {
      return this.request('POST', `${environment.serverUrl}/sholder`, sholder);
    }

    updateSholder(sholder: any) {
      return this.request('PUT', `${environment.serverUrl}/sholder/${sholder.id}`, sholder);
    }

    deleteSholder(sholder: any) {
      return this.request('DELETE', `${environment.serverUrl}/sholder/${sholder.id}`);
    }
}