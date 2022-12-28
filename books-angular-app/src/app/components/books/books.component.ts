import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { FormBuilder } from '@angular/forms';


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

  filterForm = this.fb.group({
    filterText: [this.filterText],
    onlyRead: [this.onlyRead],
    alphabetOrder: [this.alphabetOrder]
  });

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void  {
    this.booksService.getBooks().subscribe(result => {
      this.books = result;
    });
  }

  editBook(book: Book) {
    const config = new MatDialogConfig();
    config.data = book;

    const dialogRef = this.dialog.open(MatDialogComponent, config);
    dialogRef.afterClosed().subscribe((newBook: Book) => {
      this.booksService.putBook(newBook).subscribe(res => {
        const index = this.books.findIndex(b => b.id === book.id);
        this.books[index] = { 
          id: newBook.id,
          publisher: newBook.publisher,
          name: newBook.name,
          isRead: newBook.isRead,
          notice: newBook.notice
        };
      });
      
    });
  }

  addBook() {
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
      this.booksService.postBook(book).subscribe(res => {
        this.books.push(book);
      });
    });
  }

  findBooks() {

  }
}
