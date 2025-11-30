import { Component, OnInit } from '@angular/core';
import { Accord } from '../../models/accord.model';
import { AccordService } from '../../services/accord.service';
import { AudioService } from '../../services/audio.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccordConfigService } from '../../services/accordconfig.service';

@Component({
  selector: 'app-suiteaccords',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suiteaccords.component.html',
  styleUrl: './suiteaccords.component.scss'
})

export class SuiteaccordsComponent implements OnInit {

  nbAccords: number = 3;
  accords: Accord[] = [];


  constructor(private accordService: AccordService, private audioService: AudioService, public accordConfigService: AccordConfigService) { }

  ngOnInit(): void {
    this.generer()
  }



  generer() {
    this.accords = this.accordService.getAccordsAleatoires(this.nbAccords, this.accordConfigService.getTypesAutorises());
  }

  play(accord: Accord) {
    this.audioService.playChord(accord.notes, "0.4");
  }

}
