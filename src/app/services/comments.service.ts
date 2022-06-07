import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  REST_API: string = 'http://localhost:3000/api';
  httpHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  addComment(data: Comment): Observable<any> {
    let API_URL = `${this.REST_API}/add-comment`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCommentsByPost(post: string): Observable<any> {
    let API_URL = `${this.REST_API}/post-comments/${post}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(
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
