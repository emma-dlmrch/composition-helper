import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';
import { AccordConfigService } from '../../services/accordconfig.service';
import { LongPressDirective } from '../../directives/longpress.directive';
// Source - https://stackoverflow.com/a
// Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-30, License - CC BY-SA 4.0

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

@Component({
  selector: 'app-melodie',
  standalone: true,
  imports: [CommonModule, FormsModule, LongPressDirective],
  templateUrl: './melodie.component.html',
  styleUrl: './melodie.component.scss'
})
export class MelodieComponent implements OnInit {

  notes: string[] = [];

  constructor(private noteService: NoteService, private audioService: AudioService, public accordConfigService: AccordConfigService) { }

  ngOnInit(): void {
    this.generer();
  }



  generer() {
    this.notes = this.noteService.getNotesAleatoires(this.accordConfigService.nbNotes);
  }

  play(note: string) {
    const noteOctave = note + "4";
    this.audioService.playNote(noteOctave)
  }

  playIndex(noteIndex: number) {
    this.play(this.notes[noteIndex]);
  }

  async playSuite() {
    for (const note of this.notes) {
      this.play(note);
      await sleep(750);
    }
  }

  remplacerNote(noteIndex: number) {
    const ok = confirm("Voulez-vous changer cette note ?");
    if (!ok) return;
    this.notes[noteIndex] = this.noteService.getNoteAleatoire();
  }

}
