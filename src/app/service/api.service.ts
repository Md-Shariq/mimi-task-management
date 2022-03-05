import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'https://devza.com/tests/tasks/';
  apiToken: string = 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a';
  constructor(private http: HttpClient) { }



  getUser() {
    return this.http.get(`${this.baseUrl}listusers`, {
      headers: new HttpHeaders({ 
        AuthToken: this.apiToken
      })
    })
  }

  taskList() {
    return this.http.get(`${this.baseUrl}list`, {
      headers: new HttpHeaders({ 
        AuthToken: this.apiToken
      })
    })
  }

  createData(data:any) {
    return this.http.post(`${this.baseUrl}create`,data,
      {
        headers: new HttpHeaders({
          AuthToken: this.apiToken
        })
      })
  }
  
  updateData(data:any) {
    return this.http.post(`${this.baseUrl}update`,data,
      {
        headers: new HttpHeaders({
          AuthToken: this.apiToken
        })
      })
  }

  delete(data:any) {
    console.log(data);
    return this.http.post(`${this.baseUrl}delete`,data,
      {
        headers: new HttpHeaders({
          AuthToken: this.apiToken
        })
      })
  }




}
