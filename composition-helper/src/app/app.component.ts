import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenerateurComponent } from './components/generateur/generateur.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GenerateurComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'composition-helper';
}
