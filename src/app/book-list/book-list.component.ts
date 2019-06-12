import { Component, OnInit, Input } from "@angular/core";
import { IBook } from "models/books";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"]
})
export class BookListComponent implements OnInit {
  @Input() books: IBook[];
  pageTitle: string = 'Book List';
  search: string = 'Green';

  constructor() {}

  ngOnInit() {}
}
