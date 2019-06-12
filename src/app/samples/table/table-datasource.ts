import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { IBook } from '../../../../models/books';

export const allBooks: IBook[] = [
  { bookID: 1, title: 'Goodnight Moon', description: 'Biography', price: 9.99 },
  { bookID: 2, title: 'Green Eggs and Ham', description: 'Dr. Seuss', price: 6.50 },
  { bookID: 3, title: 'Where the Wild Things Are', description: 'Business', price: 19.63 },
  { bookID: 4, title: 'The Hobbit', description: 'Cookbooks', price: 22.37 },
  { bookID: 5, title: 'Curious George', description: 'Fiction', price: 4.00 },
  { bookID: 6, title: 'Alice\'s Adventures in Wonderland', description: 'Health & Fitness', price: 12.75 },
  { bookID: 7, title: 'Huckleberry Finn', description: 'History', price: 49.46 },
  { bookID: 8, title: 'Love Does', description: 'Religion & Inspiration', price: 27.00 },
  { bookID: 9, title: 'Rebel of The Sands', description: 'Self Improvement', price: 41.00 },
  { bookID: 10, title: 'The Immortal Rules', description: 'Horror', price: 15.75 }
];



export class TableDataSource extends DataSource<IBook> {
  data: IBook[] = allBooks;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<IBook[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: IBook[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: IBook[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
