import { Component, OnInit } from '@angular/core';
import { NoteGeneratorService } from '../../services/notegenerator.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-melodie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './melodie.component.html',
  styleUrl: './melodie.component.scss'
})
export class MelodieComponent implements OnInit {

  nbNotes: number = 3;
  notes : string [] = [];

  constructor(private noteGeneratorService: NoteGeneratorService, private audioService: AudioService) { }

  ngOnInit(): void {
    this.generer();
  }



  generer() {
    this.notes = this.noteGeneratorService.getNotesAleatoires(this.nbNotes);
  }

  play(note:string){
    const noteOctave = note + "4";
    this.audioService.playNote(noteOctave)
  }

}
