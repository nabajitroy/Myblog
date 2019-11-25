import { Component, OnInit,EventEmitter,Input } from '@angular/core';
import {PostService} from '../../services/posts.service'
@Component({
  selector: 'app-delete',
  template: `<a (click)="DeletePost()">  Delete </a>`,
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() postId  
 
  constructor(private postService:PostService) { }

  ngOnInit() {
  }
 
  DeletePost( ){
    this.postService.deletedPost(this.postId).subscribe(res=>{
      console.log(JSON.stringify(res))//array splice
    }) 
   
        
  }
}
