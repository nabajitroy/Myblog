import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
 import {Comments } from '../models/comments';
import { Observable, throwError,BehaviorSubject,of   } from 'rxjs';
import { retry, catchError,map,take, switchMap  } from 'rxjs/operators';
//import { ActivatedRoute } from '@angular/router';

 //import { BehaviorSubject } from 'rxjs';
 //import { Storage } from '@ionic/storage';
// import {Users} from '../models/users'
/*export interface Comments {
 
  body: string; 
  post: number | string;
}*/

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

 private dataSource: BehaviorSubject<Comments[]> = new BehaviorSubject([]);

 data: Observable<Comments[] > = this.dataSource.asObservable();//.distinctUntilChanged();




  constructor(private http: HttpClient  ) {  }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })




  }
 
   
   getAll(id){
      return this.http.get<Comments[]>(`/api/v1/comments/posts/${id}`)
       .pipe(
            switchMap(response =>{
             // console.log(JSON.stringify(response))
               return of(response)
             }),
             catchError(error=> {
            //  console.log("error")
               return throwError("error")
             })
           )
        .subscribe(
           response =>{
            this.dataSource.next(response  )
           }
        );
   }

  
 
  create(comments: Comments) { 
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('TOKEN') 
      });
       let options = { headers: headers };
       this.http.post<Comments>('api/v1/comments',comments,options).pipe(
         switchMap(response=>{ 
             return  of(response);
         }),
         catchError(error=> {
           console.log( JSON.stringify(error))
          return throwError( JSON.stringify(error))
         })
       ).subscribe( res   =>{
             this.dataSource.next([res,...this.dataSource.value]);
         }
      )
  }
}
 
  