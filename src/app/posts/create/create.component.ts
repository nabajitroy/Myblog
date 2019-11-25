import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {PostService} from '../../services/posts.service'
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  postForm: FormGroup; 
  constructor(private formBuilder:FormBuilder,private PostService:PostService ) { }
    editorConfig: AngularEditorConfig = {
        editable: true,
        height: '15rem',
        minHeight: '5rem',
        width: '15rem',
        minWidth: '77rem',
    };
  ngOnInit() {
     this.postForm = this.formBuilder.group({
       title:[''],
       body:[''],
       tags:['']
     })
  }

  createPost():void{
    let post =this.postForm.value;
      this.PostService.createPost(this.postForm.value) 
      this.postForm.reset()
  
  }

}
