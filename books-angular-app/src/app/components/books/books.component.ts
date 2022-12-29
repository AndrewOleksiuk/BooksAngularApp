import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { SearchFilters } from '../../models/search-filters';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private booksService: BooksService,
    private fb: FormBuilder,
    public dialog: MatDialog) { }

  public books: Book[] = [];

  private filterText = '';
  private onlyRead = false;
  private alphabetOrder = false;

  public filterForm = this.fb.group({
    filterText: [this.filterText],
    onlyRead: [this.onlyRead],
    alphabetOrder: [this.alphabetOrder]
  });

  public ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.booksService.getAllBooks().subscribe(result => {
      this.books = result;
    });
  }

  public editBook(book: Book): void {
    const config = new MatDialogConfig();
    config.data = book;

    const dialogRef = this.dialog.open(MatDialogComponent, config);
    dialogRef.afterClosed().subscribe((newBook: Book) => {
      if (newBook !== undefined) {
        newBook.id = book.id;
        this.booksService.putBook(newBook).subscribe(() => {
          const index = this.books.findIndex(b => b.id === book.id);
          this.books[index] = {
            id: book.id,
            publisher: newBook.publisher,
            name: newBook.name,
            isRead: newBook.isRead,
            notice: newBook.notice
          };
        });
      }
    });
  }

  public addBook(): void {
    const config = new MatDialogConfig();
    config.data = {
      id: 0,
      name: '',
      publisher: '',
      notice: '',
      isRead: false
    }

    const dialogRef = this.dialog.open(MatDialogComponent, config);
    dialogRef.afterClosed().subscribe((book: Book) => {
      if (book !== undefined) {
        this.booksService.postBook(book).subscribe(() => {
          this.books.push(book);
        });
      }
    });
  }

  public deleteBook(book: Book): void {
    this.booksService.deleteBook(book.id).subscribe(() => {
      this.books.forEach((value, index) => {
        if (value == book) this.books.splice(index, 1);
      });
    });
  }

  public findBooks(): void {
    const filters: SearchFilters = this.filterForm.value as SearchFilters;
    this.booksService.getBooks(filters).subscribe(res => {
      this.books = res;
    });
  }
}
