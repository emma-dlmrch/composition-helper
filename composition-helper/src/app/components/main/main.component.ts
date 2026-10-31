import { Component } from '@angular/core';
import { ParametrageComponent } from '../parametrage/parametrage.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ParametrageComponent, RouterOutlet, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showSettings: boolean = false;
}
