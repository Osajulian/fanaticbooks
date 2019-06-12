import { Injectable } from '@angular/core';
import { IBook } from 'models/books';
import { allBooks } from '../../../data';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  getBook(id: number): IBook {
    return allBooks.find((book) => book.bookID == id);
  }

  get(take?: number): IBook[] {
    return allBooks.slice(0, take || 10);
  }
}
