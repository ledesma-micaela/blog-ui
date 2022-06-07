import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  REST_API: string = 'http://localhost:3000/api';
  httpHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  addPost(data: Post): Observable<any> {
    let API_URL = `${this.REST_API}/add-post`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPosts(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}`);
  }

  getPost(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/read-post/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  updatePost(id:string, data: Post): Observable<any> {
    let API_URL = `${this.REST_API}/update-post/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePost(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/delete-post/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse): Observable<Error> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
