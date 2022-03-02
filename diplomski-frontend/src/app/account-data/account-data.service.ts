import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountData } from '../account-Data/account-Data.model';


@Injectable({
    providedIn: 'root'
})

export class AccountDataService{

    private accountDataUrl = "http://localhost:8080/accountdata";

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<AccountData[]>(this.accountDataUrl);
    }

    getOne(id: String) {
        return this.http.get<AccountData>(this.accountDataUrl+`/${id}`);
      }
    
    
    delete(id: String) {
    return this.http.delete(this.accountDataUrl+`/${id}`);
    }

    add(accountData:AccountData) {
    return this.http.post(this.accountDataUrl+'/register', accountData);
    }

    update(id:String, accountData:AccountData) {
    return this.http.put(this.accountDataUrl+`/${id}`, accountData)
    }

    
  getOneByUsername(username: String) {
    return this.http.get<AccountData>(this.accountDataUrl+`/username/${username}`);
  }

}