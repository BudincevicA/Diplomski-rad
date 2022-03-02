import { Component, OnInit } from '@angular/core';
import { ForumTopic } from '../forum-topic/forum-topic.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForumTopicService } from '../forum-topic/forum-topic.service';
import { FormErrorService } from 'src/app/shared/formError.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { Forum } from '../forum.model';
import { ForumService } from '../forum.service';

@Component({
  selector: 'app-forum-topic-add-edit',
  templateUrl: './forum-topic-add-edit.component.html',
  styleUrls: ['./forum-topic-add-edit.component.css']
})
export class ForumTopicAddEditComponent implements OnInit {

  private id: string;
  private edit = false;
  public forumTopic = new ForumTopic();
  public forum = new Forum();
  public form = new FormGroup({});


  constructor(private forumService: ForumService,private fb: FormBuilder,private forumTopicService: ForumTopicService, private route: ActivatedRoute, public formErrorService: FormErrorService, private snackBarService : SnackBarService) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', {validators: [Validators.required]}],
      description: ['', {validators: [Validators.required]}],
    });

    this.route.params.subscribe(routeParams => {
      this.forumService.getOne(routeParams.id).subscribe((data: Forum)=>{
        this.forum=data;
        console.log(this.forum)
      });

  });

  }
  onSave(){
    const s = this.form.value;
    this.forumTopic = s;
    this.forumTopic.forum=this.forum;
    this.forumTopicService.add(this.forumTopic).subscribe(_ => {
      this.form.reset();
      this.snackBarService.openSnackBar("Successfully added new forum topic", "X")
    });
    
  }

}
