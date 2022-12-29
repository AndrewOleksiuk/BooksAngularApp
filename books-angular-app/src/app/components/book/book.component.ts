import { Book } from '../../models/book';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  @Input() book: Book = {
    id: 0,
    name: '',
    notice: '',
    publisher: '',
    isRead: false
  };
}
