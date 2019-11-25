import { Component, OnInit } from '@angular/core';
import {Comments} from '../models/comments';
import {CommentsService} from '../services/comments.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
 comments = new Array<Comments>();
 //comments:Comments ;
 commentForm : FormGroup
    editorConfig: AngularEditorConfig = {
    editable: true,
    height: '15rem',
    minHeight: '5rem',
    width: '15rem',
    minWidth: '77rem',
    uploadUrl: 'v1/image',
    sanitize: true,
    enableToolbar: false,
        showToolbar: true,

    }; 
 
  constructor(
    private service : CommentsService,
    private route :ActivatedRoute,
    private formBuilder: FormBuilder,
   //private TestDataService:TestDataService
  ) {   }

  ngOnInit() {
     this.service.data.subscribe(response=>{
     //  console.log(JSON.stringify(response))
      this.comments   = response;
     }) 
     
    //initialize comment form 
    this.commentForm = this.formBuilder.group({ 
      body: [''] 
    });
     
     let postId = this.route.snapshot.paramMap.get('id');
   
   
  
  }

  saveComment(){
     let comment  = this.commentForm.value;
     comment.post =this.route.snapshot.paramMap.get('id') 
     this.service.create(comment)
     this.commentForm.reset( );
  }

}
