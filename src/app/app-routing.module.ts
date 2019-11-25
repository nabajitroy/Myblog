import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import{PostsComponent} from '../app/posts/list/posts.component';
import { LoginComponent } from './login/login.component'; 
import {CreateComponent} from './posts/create/create.component';
import {UpdateComponent} from './posts/update/update.component';
 
const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "/home"},
  {path: "home", component: HomeComponent},
  {path: "post/:id", component: PostsComponent},
  {path: "login", component: LoginComponent},  
  {path: "posts/create", component: CreateComponent},  
  {path: "update-post/:id", component: UpdateComponent},  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
