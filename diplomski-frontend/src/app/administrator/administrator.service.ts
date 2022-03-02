import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Administrator } from './administrator.model';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  private administratorUrl = "http://localhost:8080/administrator";
  private path ="";
  private lista : string[];
  private poslednji = "";
  private praviPath ="";
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Administrator[]>(this.administratorUrl);
  }

  getOne(id: String) {
    return this.http.get<Administrator>(this.administratorUrl+`/${id}`);
  }

  getOneByUsername(username: String) {
    return this.http.get<Administrator>(this.administratorUrl+`/username/${username}`);
  }

  delete(id: String) {
    return this.http.delete(this.administratorUrl+`/${id}`);
  }

  add(administrator:Administrator) {
    
    this.path=administrator["accountData"]["profilePicturePath"];
    if (this.path==""){
      administrator["accountData"]["profilePicturePath"]="images/profile_images/default.png"
    }else{
    this.lista = this.path.split("\\");
    this.poslednji = this.lista[this.lista.length-1];
    this.praviPath="images/profile_images/" +this.poslednji;
    administrator["accountData"]["profilePicturePath"] = this.praviPath
    }
    return this.http.post(this.administratorUrl+'/register',administrator);
  }

  update(username:string, administrator:Administrator) {
    return this.http.put(this.administratorUrl+`/${username}`, administrator)
  }


}
