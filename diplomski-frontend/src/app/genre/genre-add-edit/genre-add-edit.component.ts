import { Component, OnInit } from '@angular/core';
import { Genre } from '../genre.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenreService } from '../genre.service';
import { FormErrorService } from 'src/app/shared/formError.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-genre-add-edit',
  templateUrl: './genre-add-edit.component.html',
  styleUrls: ['./genre-add-edit.component.css']
})
export class GenreAddEditComponent implements OnInit {

  private id: string;
  private edit = false;
  public genre = new Genre();
  public form = new FormGroup({});

  constructor(private fb: FormBuilder,private GenreService: GenreService, private route: ActivatedRoute, public formErrorService: FormErrorService, private snackBarService : SnackBarService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', {validators: [Validators.required]}],
      description: ['', {validators: [Validators.required]}],
    });
    if(this.route.snapshot.paramMap.get("id")){
      this.edit = true;
      this.id = this.route.snapshot.paramMap.get("id");
      this.GenreService.getOne(this.id).subscribe((data: Genre) => {
        this.genre = data;
        this.form.patchValue(this.genre);
      })
    }
    else {
    }
  }

  onSave(){
    const s = this.form.value;
    this.genre = s;
    if(this.edit){
      this.GenreService.update(this.id, this.genre).subscribe(_ => {
        this.snackBarService.openSnackBar("Successfully edited genre", "X")
      });
    }
    else{
      this.GenreService.add(this.genre).subscribe(_ => {
        this.form.reset();
        this.snackBarService.openSnackBar("Successfully added new genre", "X")
    });
    }
  }

}
