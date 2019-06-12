import { Component, OnInit } from '@angular/core';
import { IBook } from 'models/books';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  books: IBook[];
  
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.books = this.bookService.get(10);
  }

}
