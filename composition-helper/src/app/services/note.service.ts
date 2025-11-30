import { Injectable } from '@angular/core';


export const NOTES = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

@Injectable({ providedIn: 'root' })
export class NoteService {

  //pour l'instant on va pas se préocupper des octaves
  getNoteAleatoire(): string {
    const index = Math.floor(Math.random() * NOTES.length);
    return NOTES[index];
  }

  getNotesAleatoires(nombre:number): string[] {
    const listeNotes: string[] = [];
    for (let i = 0; i< nombre; i++) {
      listeNotes.push(this.getNoteAleatoire());
    }
    return listeNotes;
  }

}
