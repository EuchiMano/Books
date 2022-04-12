import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  _url = 'https://reactnd-books-api.udacity.com/books'
  constructor(private http: HttpClient) {
  }

  getAllBooks() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer 123e"
    })

    return this.http.get<any>(this._url, { 
      headers: headers 
    });
  }
}
