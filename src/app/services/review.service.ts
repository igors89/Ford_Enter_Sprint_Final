import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiReviews, Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly apiUrl = "http://localhost:3001";

  constructor(private http: HttpClient) { }

  getReviews(): Observable<ApiReviews>{
    return this.http.get<ApiReviews>(`${this.apiUrl}/reviews`);
  }

  postReview(novaAvaliacao: Omit<Review, 'id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/review`, novaAvaliacao);
  }
}
