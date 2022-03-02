import { Component, OnInit } from '@angular/core';
import { Critic } from '../critic.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CriticService } from '../critic.service';
import { FormErrorService } from 'src/app/shared/formError.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-critic-add-edit',
  templateUrl: './critic-add-edit.component.html',
  styleUrls: ['./critic-add-edit.component.css']
})
export class CriticAddEditComponent implements OnInit {

  private username: string;
  private edit = false;
  public critic = new Critic();
  public form = new FormGroup({});
  private path ="";
  private lista : string[];
  private poslednji = "";
  private praviPath ="";

  constructor(private CriticService: CriticService, private route: ActivatedRoute, public formErrorService: FormErrorService, private snackBarService : SnackBarService) { }

  ngOnInit() {

    this.form = new FormGroup({
      firstName : new FormControl(''),
      lastName : new FormControl('')
    });
    if (this.route.snapshot.paramMap.get("username")) {
      this.edit = true;
      this.username = this.route.snapshot.paramMap.get("username");
      this.CriticService.getOneByUsername(this.username).subscribe((data: Critic) => {
        this.critic = data;
        this.critic.accountData.profilePicturePath="";
        this.form.patchValue(this.critic);
      });
    }
  }

  onSave() {
    if (this.form.invalid) {
      this.formErrorService.markFormGroupTouched(this.form);
    } else {
      const critic = this.form.value;
      delete critic['accountData']['confirmPassword'];
      if (this.edit) {
        critic.accountData.id = this.critic.accountData.id;
        this.critic = critic;
        this.path=this.critic.accountData.profilePicturePath;
        if(this.path==""){
          this.critic["accountData"]["profilePicturePath"]="images/profile_images/default.png"
        }else{
          this.critic.accountData.profilePicturePath="";
          this.lista = this.path.split("\\");
          this.poslednji = this.lista[this.lista.length-1];
          this.praviPath="images/profile_images/" +this.poslednji;
          this.critic["accountData"]["profilePicturePath"] = this.praviPath
        }

        this.CriticService.update(this.username, this.critic).subscribe();
        this.snackBarService.openSnackBar("Updated profile", "X")
      } else {
        this.snackBarService.openSnackBar("Added critic", "X")
        this.critic = critic;
        this.CriticService.add(this.critic).subscribe(_ => {
          this.form.reset();
        });
      }
    }
  }
}
