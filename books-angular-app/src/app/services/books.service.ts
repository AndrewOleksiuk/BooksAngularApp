import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Book } from '../models/book';
import { SearchFilters } from '../models/search-filters';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'http://localhost:5170/api/Books';

  constructor(private http: HttpClient) { }

  public getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + id);
  }

  public getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  public getBooks(searchFilters: SearchFilters): Observable<Book[]> {
    return this.http.put<Book[]>(`${this.apiUrl}/find`, searchFilters);
  }

  public postBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, { book });
  }

  public putBook(book: Book): Observable<object> {
    return this.http.put(this.apiUrl, { book });
  }

  public deleteBook(id: number): Observable<object> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
} 