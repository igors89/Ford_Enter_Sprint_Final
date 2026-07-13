import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiReviews } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly apiUrl = "http://localhost:3001";

  constructor(private http: HttpClient) { }

  getReviews(): Observable<ApiReviews>{
    return this.http.get<ApiReviews>(`${this.apiUrl}/reviews`);
  }
}
