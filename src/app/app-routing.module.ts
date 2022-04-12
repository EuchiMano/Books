import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from './book-page/book-page.component';
import { BookSearchComponent } from './book-search/book-search.component';

const routes: Routes = [
  {
    path: '',
    component: BookPageComponent
  },
  {
    path: 'search',
    component: BookSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
