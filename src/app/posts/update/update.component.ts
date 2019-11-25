import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup} from '@angular/forms';
import { PostService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import{Posts} from '../../models/posts';
import{HomeComponent} from '../../home/home.component'
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  postForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private postService:PostService,
    private route:ActivatedRoute
  ) { }
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
    id;
  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title:[''],
      body:[''],
      tags:['']
    })
     this.route.params.subscribe(res=>{
       this.id=res.id;
     })
     this.postService.getSinglePost(this.id).subscribe( (post:Posts)=>{
      //  console.log(JSON.stringify(response))
         this.update(post)
      })
     
  }

  update(post:Posts){
   this.postForm.patchValue({
      title: post.title,
      body:post.body,
      tags:post.tags
   })
  }

  updatePost(){
    const post = this.postForm.value;
  //  post.id = this.id;
    this.postService.updatePost(post,this.id).subscribe(res=>{
      console.log(JSON.stringify(res))
    })
  }
 


}
