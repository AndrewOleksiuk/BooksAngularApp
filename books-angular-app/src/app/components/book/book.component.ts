import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor() { }

  @Input() book: Book = {
    id: 0,
    name: '',
    notice: '',
    publisher: '',
    isRead: false
  };
  
  ngOnInit(): void {
  }

}
