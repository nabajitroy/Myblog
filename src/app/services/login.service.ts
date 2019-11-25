import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { map,catchError, switchMap  } from "rxjs/operators";
import {Observable,throwError,of} from 'rxjs';
import{Token} from '../models/token';
/*export interface token  {
   status:string,
   token:string,
   user: { 
        _id: number|string;
        email: string; 
        role:string;
     };
} ;*/
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private  http:HttpClient) { }

  login(loginData){
    /*  return this.http.post('/api/v1/login',loginData)
        .pipe(
          catchError( err => err ),
          map( response => response),
          
        ); // end of pipe
*/

        return this.http.post<Token>('/api/v1/login',loginData)
        .pipe(
           switchMap(response =>{
            // console.log(JSON.stringify(response));
             return of(response)
           }),
           catchError(err=>{
             return throwError('error'+JSON.stringify(err))
           })
        ) 
   }

   register(registerData){
    return this.http.post('/api/v1/register',registerData)
      .pipe(
        catchError( err => err ),
        map( response => response),
        
      ); // end of pipe
 }
 

}
