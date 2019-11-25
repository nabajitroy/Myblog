import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/posts.service'
import { ActivatedRoute } from '@angular/router';
//import {CommentsComponent} from '../comments/comments.component'
import{Posts} from '../../models/posts'; 
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  post: any ={
    id:0,
    title:'',
    body:'',
    createdBy:[],
    tags:[]
  };
  constructor(public PostService: PostService,private route: ActivatedRoute) { }

  ngOnInit() {
          let id = this.route.snapshot.paramMap.get('id');
          this.PostService.getSinglePost(id).subscribe(response=>{
          this.post = response;
        //  console.log(typeof(this.post));
         });
        
       

  }

}
