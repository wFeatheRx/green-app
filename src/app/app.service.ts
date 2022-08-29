import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Observable } from 'rxjs/internal/Observable';
import { Register } from './viewmodel/register';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  async upsertTrackCount(title: string)  {

    const params = {
      tag: title,
      date: new Date().toLocaleDateString()
    }

    const source$ = this.httpClient.put(`/api/tracks/counter`, params);

    return await lastValueFrom(source$);
  }


  async addRegister(register: Register)  : Promise<any> {
    register.updateAt = new Date();
    const source$ = this.httpClient.put(`/api/registers/`, register);
    console.log(source$);
    return await lastValueFrom(source$);
  }

  async getRegister(phone: string) : Promise<Register>{
    let register = this.httpClient.get<Register>(`/api/registers/${phone}`);
    return await lastValueFrom(register);
  }

/*  async updateRegister(register: Register) {
    register.updateAt = new Date();
    const source$ = this.httpClient.put(`/api/registers/:id`,register);
    return await lastValueFrom(source$)
  }

 */ 
}
