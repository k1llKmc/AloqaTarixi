import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LanguageSelectComponent} from '../language-select/language-select.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    LanguageSelectComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
