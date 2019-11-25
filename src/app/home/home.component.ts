import { Component, OnInit,Output,EventEmitter ,ViewChild} from '@angular/core';
import { PostService } from '../services/posts.service'
import { Posts } from '../models/posts';
//import { UpdateComponent } from '../posts/update/update.component';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
 // @ViewChild(UpdateComponent, {static: false}) Component
  posts = new Array<Posts>();
  @Output() myEvent = new EventEmitter();
 
  constructor(public PostService: PostService) { }

  ngOnInit() {
  
    this.PostService.data.subscribe(response=>{
      this.posts=response;
     //console.log(JSON.stringify(response));
    })
  }

  onChanged( ) {
    console.log("Hello I Chicked changed");
}
     
}