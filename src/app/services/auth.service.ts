import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { apiUrl } from '../resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async getRegistrationFields(body:any): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/${apiUrl.getRegFields}`,body).toPromise();
  }

  async Login(user: any): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/${apiUrl.login}`, user).toPromise();
  }

  async registerNewUser(body: any): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/${apiUrl.saveReg}`, body).toPromise();
  }

  async getRegDetails(body:any): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/${apiUrl.getReg}`, body).toPromise();
  }
}
