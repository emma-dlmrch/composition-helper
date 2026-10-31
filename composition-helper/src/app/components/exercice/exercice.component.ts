import { Component, OnInit } from '@angular/core';
import { Accord } from '../../models/accord.model';
import { AccordService } from '../../services/accord.service';
import { AccordConfigService } from '../../services/accordconfig.service';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-exercice',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './exercice.component.html',
  styleUrl: './exercice.component.scss'
})
export class ExerciceComponent implements OnInit{

  constructor(private accordService : AccordService, private accordConfigService : AccordConfigService) { }

  isPlaying:boolean =false;
  time:number = 0;
  accord : Accord | undefined ;
  interval: ReturnType<typeof setInterval> | undefined;

  ngOnInit(): void {
    this.accord = this.accordService.getAccordAleatoire(this.accordConfigService.getTypesAutorises());
  }

  getNewChord(){
    if (this.accordConfigService.aleatoire) {
      this.accord = this.accordService.getAccordAleatoire(this.accordConfigService.getTypesAutorises());
    } else if (this.accord) {
      this.accord = this.accordService.getAccordAvecIntervalle(this.accord, this.accordConfigService.intervalle, this.accordConfigService.getTypesAutorises(), true);
    }
  }

  onPlay(){
    if (!this.isPlaying) {
      this.time = 0;
      this.isPlaying = true;
      this.startTimer();
    }
  }

  onPause() {
    this.isPlaying = false;
    clearInterval(this.interval);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time >= this.accordConfigService.temps - 1) {
        this.time =0;
        this.getNewChord()
      } else {
        this.time++;
      }
    }, 1000)
  }
}
