import { Component, OnInit } from '@angular/core';
import { AccordConfigService } from '../../services/accordconfig.service';
import { ACCORDS, AccordType } from '../../services/accord.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametrage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametrage.component.html',
  styleUrl: './parametrage.component.scss'
})
export class ParametrageComponent implements OnInit {

  types: AccordType[] = [];

  constructor(public accordConfigService: AccordConfigService) { }


  ngOnInit(): void {
    this.types = Object.keys(this.accordConfigService.accordsAutorises) as AccordType[];
  }


  toggle(type: AccordType) {
    this.accordConfigService.accordsAutorises[type] =
      !this.accordConfigService.accordsAutorises[type];
  }

  isActive(type: AccordType): boolean {
    return !!this.accordConfigService.accordsAutorises[type];
  }
}
