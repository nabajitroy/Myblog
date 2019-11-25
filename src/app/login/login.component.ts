import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router'
import{Token} from '../models/token';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  user:Token;
  constructor(private formBuilder: FormBuilder, private router: Router,private loginService :LoginService) { }

  ngOnInit() {
    this.loginForm= this.formBuilder.group({
      email:[''],
      password:['']
    })
   this.registerForm = this.formBuilder.group({
     email:[''],
     fullname:[''],
     password:['']
   })
  }

  login(){
 //   console.log("JSON.stringify(r)" )
   this.loginService.login(this.loginForm.value) 
    .subscribe(  response => {
      if (response ) {
        console.log(JSON.stringify(response.user) )
        localStorage.setItem('TOKEN',response.token );
        localStorage.setItem('USER',JSON.stringify(response.user)  );
        this.router.navigateByUrl('/home');
        }
      },
      error => {
        console.log( error )
      }); 
  }

 

  register(){
    this.loginService.register(this.registerForm.value)
    .subscribe(response=>{
       console.log(JSON.stringify(response))
    })
  }

}
