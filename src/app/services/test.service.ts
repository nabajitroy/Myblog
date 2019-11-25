import {Comments} from '../models/comments';
import {Injectable} from '@angular/core'; 
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import 'rxjs/add/operator/map';
import {Subject,BehaviorSubject,Observable,Operator} from 'rxjs';
import {map} from 'rxjs/operators'
 
import { retry, catchError } from 'rxjs/operators';
@Injectable()
export class PackageService {
	packageData: Subject<Array<Comments>> = new BehaviorSubject<Array<Comments>>([]);

	constructor(private http: HttpClient) {

	}
	
	loadAllPackages () {
		this.http
		.get('https://api.myjson.com/bins/1g87r')
		.pipe(
           retry(2), 
        )
		.subscribe (
			(data: any) => {
				this.packageData.next(data);
			},
			(err: any) => console.error("loadAllPackages: ERROR"),
			() => console.log("loadAllPackages: always")
		);
	}

}