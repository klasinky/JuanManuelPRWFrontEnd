import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store(storageKey: string, value: any){

    const encryptedValue = btoa(escape(JSON.stringify(value)));
    localStorage.setItem(storageKey, encryptedValue);
  }

  async get(storageKey: string){
    const res = await localStorage.getItem(storageKey);
    
    if(res){
      return JSON.parse(unescape(atob(res)));
    }else{
      return false;
    }
  }

  async removeKey(storageKey: string){
    await localStorage.removeItem(storageKey);
  }

  async clear(){
    await localStorage.clear();
  }
}
