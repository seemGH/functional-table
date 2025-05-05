import {Component} from '@angular/core';

import {Tag} from 'primeng/tag';
import {Button} from 'primeng/button';

import {UserTableComponent} from './components/user-table/user-table.component';

@Component({
  selector: 'app-root',
  imports: [
    UserTableComponent,
    Tag,
    Button,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isDarkMode = false;

  toggle(): void {
    this.isDarkMode = !this.isDarkMode;

    const element = document.querySelector('html') as HTMLElement;
    element.classList.toggle('my-app-dark');
  }
}
