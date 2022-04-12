import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

interface States {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  states: States[] = [
    { value: 0, viewValue: 'currentlyReading' },
    { value: 1, viewValue: 'wantToRead' },
    { value: 2, viewValue: 'read' },
  ];

  listaDeLibrosNowReading: any = [];
  listaDeLibrosWantedToRead: any = [];
  listaDeLibrosRead: any = [];
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((resp) => {
      this.listaDeLibrosNowReading = resp.books.filter(
        (book) => book.shelf === 'currentlyReading'
      );
      this.listaDeLibrosWantedToRead = resp.books.filter(
        (book) => book.shelf === 'wantToRead'
      );
      this.listaDeLibrosRead = resp.books.filter(
        (book) => book.shelf === 'read'
      );
    });
  }

  stateChangedFromNowReading($event): void {
    let splitted = $event.value.split('*');
    let bookFound = this.listaDeLibrosNowReading.filter(
      (book) => book.id === splitted[1]
    );

    if (splitted[0] === '0') return;
    if (splitted[0] === '1') {
      this.listaDeLibrosWantedToRead.push(...bookFound);
    } else {
      this.listaDeLibrosRead.push(...bookFound);
    }
    this.listaDeLibrosNowReading.forEach((element, index) => {
      if (element.id === splitted[1])
        this.listaDeLibrosNowReading.splice(index, 1);
    });
  }

  stateChangedFromNowWanToRead($event): void {
    let splitted = $event.value.split('*');
    let bookFound = this.listaDeLibrosWantedToRead.filter(
      (book) => book.id === splitted[1]
    );

    if (splitted[0] === '1') return;
    if (splitted[0] === '0') {
      this.listaDeLibrosNowReading.push(...bookFound);
    } else {
      this.listaDeLibrosRead.push(...bookFound);
    }
    this.listaDeLibrosWantedToRead.forEach((element, index) => {
      if (element.id === splitted[1])
        this.listaDeLibrosWantedToRead.splice(index, 1);
    });
  }

  stateChangedFromToRead($event): void {
    let splitted = $event.value.split('*');
    let bookFound = this.listaDeLibrosRead.filter(
      (book) => book.id === splitted[1]
    );

    if (splitted[0] === '2') return;
    if (splitted[0] === '0') {
      this.listaDeLibrosNowReading.push(...bookFound);
    } else {
      this.listaDeLibrosWantedToRead.push(...bookFound);
    }
    this.listaDeLibrosRead.forEach((element, index) => {
      if (element.id === splitted[1]) this.listaDeLibrosRead.splice(index, 1);
    });
  }
}
