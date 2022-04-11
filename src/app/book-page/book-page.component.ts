import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {

  listaDeLibros : any = [];
  constructor(private bookService: BookService) { 
    
  }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(resp => {
      this.listaDeLibros = resp.books;
    })
  }

}
