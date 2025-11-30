import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';
// Source - https://stackoverflow.com/a
// Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-30, License - CC BY-SA 4.0

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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

  constructor(private noteService: NoteService, private audioService: AudioService) { }

  ngOnInit(): void {
    this.generer();
  }



  generer() {
    this.notes = this.noteService.getNotesAleatoires(this.nbNotes);
  }

  play(note:string){
    const noteOctave = note + "4";
    this.audioService.playNote(noteOctave)
  }

  async playSuite(){
    for (const note of this.notes) {
      this.play(note);
      await sleep(750);  
    }
  }

}
