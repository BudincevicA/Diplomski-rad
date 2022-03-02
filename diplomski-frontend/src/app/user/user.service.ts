import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = "http://localhost:8080/user";
  private path ="";
  private lista : string[];
  private poslednji = "";
  private praviPath ="";


  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(this.userUrl);
  }

  getOne(id: String) {
    return this.http.get<User>(this.userUrl+`/${id}`);
  }

  getOneByUsername(username: String) {
    return this.http.get<User>(this.userUrl+`/username/${username}`);
  }

  delete(id: String) {
    return this.http.delete(this.userUrl+`/${id}`);
  }

  add(user:User) {
    this.path=user["accountData"]["profilePicturePath"];
    if(this.path==""){
      user["accountData"]["profilePicturePath"]="images/profile_images/default.png"
    }else{
    this.lista = this.path.split("\\");
    this.poslednji = this.lista[this.lista.length-1];
    this.praviPath="images/profile_images/" +this.poslednji;
    user["accountData"]["profilePicturePath"] = this.praviPath
    }
    return this.http.post(this.userUrl+'/register', user);
  }

  update(username:string, user:User) {
    user["accountData"]["password"]="12341234";
    return this.http.put(this.userUrl+`/${username}`, user)
  }

  
  updateU(username:string, user:User) {
    /*this.path=user["accountData"]["profilePicturePath"];
    if(this.path==""){
      user["accountData"]["profilePicturePath"]="images/profile_images/default.png"
    }else{
    this.lista = this.path.split("\\");
    this.poslednji = this.lista[this.lista.length-1];
    this.praviPath="images/profile_images/" +this.poslednji;
    user["accountData"]["profilePicturePath"] = this.praviPath
    }*/
    
    return this.http.put(this.userUrl+`/${username}`, user)
  }

}
