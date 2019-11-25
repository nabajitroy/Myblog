import { Component, OnInit } from '@angular/core';
import {CommentsService} from './services/comments.service' 
import { Router,RoutesRecognized,NavigationStart } from '@angular/router';
import {ActivatedRoute,Params} from '@angular/router';
import {Observable} from 'rxjs';
import {map,filter} from 'rxjs/operators';
import { PostService } from './services/posts.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent     {
 
  showHead:boolean = false;
 // let postId = this.route.snapshot.paramMap.get('id');
    constructor( 
      private service:CommentsService,
      private router: Router,
      private postService:PostService
    ){
    
     
      this.router.events.subscribe(val => {
        if (val instanceof RoutesRecognized) {
        //  console.log(val);
            var strId = val.state.root.firstChild.params["id"];
          //  console.log("calling getAll")
          if(strId)
            this.service.getAll(strId);
        }
       
       });
       
       this.postService.getPosts()
         
       router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login') {
            this.showHead = false;
          } else {
            // console.log("NU")
            this.showHead = true;
          }
        }
      });
      
 
 
 
  }
 
 
}
