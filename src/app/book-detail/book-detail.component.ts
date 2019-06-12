import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "../services/book.service";
import { IBook } from "models/books";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.scss"]
})
export class BookDetailComponent implements OnInit {
  book: IBook;
  bookTitle: string = 'Book Detail'

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {
    const bookId: number = this.route.snapshot.params["id"];
    this.book = this.bookService.getBook(bookId);
  }

  goBack(): void {
    this.router.navigate(['/books'])
  }
}
