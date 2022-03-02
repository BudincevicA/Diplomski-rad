import { Component, OnInit } from '@angular/core';
import { Actor } from '../actor.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActorService } from '../actor.service';
import { FormErrorService } from 'src/app/shared/formError.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-actor-add-edit',
  templateUrl: './actor-add-edit.component.html',
  styleUrls: ['./actor-add-edit.component.css']
})
export class ActorAddEditComponent implements OnInit {

  private id: string;
  private edit = false;
  public actor = new Actor();
  public form = new FormGroup({});

  constructor(private fb: FormBuilder,private ActorService: ActorService, private route: ActivatedRoute, public formErrorService: FormErrorService, private snackBarService : SnackBarService) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', {validators: [Validators.required]}],
      lastName: ['', {validators: [Validators.required]}],
      profilePicturePath: ['', {validators: [Validators.required]}],
      biography: ['', {validators: [Validators.required]}],
      placeOfBirth: ['', {validators: [Validators.required]}],
      dateOfBirth: ['', {validators: [Validators.required]}]
    });
    if(this.route.snapshot.paramMap.get("id")){
      this.edit = true;
      this.id = this.route.snapshot.paramMap.get("id");
      this.ActorService.getOne(this.id).subscribe((data: Actor) => {
        this.actor = data;
        this.form.patchValue(this.actor);
      })
    }
    else {
    }
  }


  onSave(){
    const s = this.form.value;
    this.actor = s;
    if(this.edit){
      this.ActorService.update(this.id, this.actor).subscribe(_ => {
        this.snackBarService.openSnackBar("Successfully edited actor", "X")
      });
    }
    else{
      this.ActorService.add(this.actor).subscribe(_ => {
        this.form.reset();
        this.snackBarService.openSnackBar("Successfully added new actor", "X")
    });
    }
  }

}
