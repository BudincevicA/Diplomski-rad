import { Component, OnInit } from '@angular/core';
import { Director } from '../director.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DirectorService } from '../director.service';
import { FormErrorService } from 'src/app/shared/formError.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-director-add-edit',
  templateUrl: './director-add-edit.component.html',
  styleUrls: ['./director-add-edit.component.css']
})
export class DirectorAddEditComponent implements OnInit {

  private id: string;
  private edit = false;
  public director = new Director();
  public form = new FormGroup({});

  constructor(private fb: FormBuilder,private DirectorService: DirectorService, private route: ActivatedRoute, public formErrorService: FormErrorService, private snackBarService : SnackBarService) { }

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
      this.DirectorService.getOne(this.id).subscribe((data: Director) => {
        this.director = data;
        this.form.patchValue(this.director);
      })
    }
    else {
    }
  }

  onSave(){
    const s = this.form.value;
    this.director = s;
    if(this.edit){
      this.DirectorService.update(this.id, this.director).subscribe(_ => {
        this.snackBarService.openSnackBar("Successfully edited director", "X")
      });
    }
    else{
      this.DirectorService.add(this.director).subscribe(_ => {
        this.form.reset();
        this.snackBarService.openSnackBar("Successfully added new director", "X")
    });
    }
  }

}
