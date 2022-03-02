import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Critic } from './critic.model';

@Injectable({
  providedIn: 'root'
})
export class CriticService {

  private criticUrl = "http://localhost:8080/critic";
  private path ="";
  private lista : string[];
  private poslednji = "";
  private praviPath ="";


  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Critic[]>(this.criticUrl);
  }

  getOne(id: String) {
    return this.http.get<Critic>(this.criticUrl+`/${id}`);
  }

  getOneByUsername(username: String) {
    return this.http.get<Critic>(this.criticUrl+`/username/${username}`);
  }

  delete(id: String) {
    return this.http.delete(this.criticUrl+`/${id}`);
  }

  add(critic:Critic) {
    this.path=critic["accountData"]["profilePicturePath"];
    if (this.path==""){
        critic["accountData"]["profilePicturePath"]="images/profile_images/default.png"
    }else{
    this.lista = this.path.split("\\");
    this.poslednji = this.lista[this.lista.length-1];
    this.praviPath="images/profile_images/" +this.poslednji;
    critic["accountData"]["profilePicturePath"] = this.praviPath
    }

    return this.http.post(this.criticUrl+'/register', critic);
  }

  update(username:string, critic:Critic) {
    return this.http.put(this.criticUrl+`/${username}`, critic)
  }

}
