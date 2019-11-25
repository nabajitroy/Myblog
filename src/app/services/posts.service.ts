import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Posts } from '../models/posts';
import { Observable, throwError,of,BehaviorSubject } from 'rxjs';
import { retry, catchError, switchMap,map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class PostService {

  

  private dataSource: BehaviorSubject<Posts[]> = new BehaviorSubject([]);
  data: Observable<Posts[] > = this.dataSource.asObservable();//.distinctUntilChanged();
 
  constructor(private http: HttpClient) { }
  // Http Options
    private header = {
        headers : new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('TOKEN') 
     })
    };
  








  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  

   // Get students data
   getPosts()  {
      return this.http.get<Posts[]>('/api/v1/posts').pipe(
        switchMap(response=>{
           return of(response);
        }),
        catchError(error=>{
          return throwError(JSON.stringify(error))
        })
      ).subscribe(response=>{
       // console.log(JSON.stringify(response));
          this.dataSource.next(response)
      })
  }
 

  getSinglePost(id):Observable<Posts>{
    return this.http
    .get<Posts>('/api/v1/posts/'+id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

  }


  createPost(post:Posts){
     

     return this.http.post<Posts>('/api/v1/posts',post,this.header).pipe(
       switchMap(response=>{
       //  console.log(response)
         return of(response)
       }),
       catchError(error=>{
        // console.log(error)
         return throwError(error.message)
       })
     ) 
     .subscribe(response=>{
      //console.log(response)
       this.dataSource.next([response,...this.dataSource.value])
       return of(response)
     })
   }
 

  updatePost(post:Posts,id:string):Observable<Posts>{

    return this.http.put<Posts>(`/api/v1/posts/${id}`,post,this.header).pipe(
          switchMap(response=>{
            this.dataSource.next([response,...this.dataSource.value])
            return of(response);
          }),
          catchError(error=>{
            return throwError(error);
          })
        ) 
   }

   deletedPost(id):Observable<Posts>{
  //  const data =new Array;
    return this.http.delete<Posts>(`/api/v1/posts/${id}`,this.header).pipe(
       switchMap(response=>{
         const data =this.dataSource.value;
     //    console.log(JSON.stringify(data ));
         data.splice(data.findIndex(e => e._id === id),1);
      //   console.log(JSON.stringify(data));
         this.dataSource.next(data);
         return of(response);
       }),
       catchError(error=>{
         return throwError(JSON.stringify(error));
       })
     )

   }




   
}