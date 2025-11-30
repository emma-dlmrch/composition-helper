import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class NoteGeneratorService {

  private notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

  //pour l'instant on va pas se préocupper des octaves
  getNoteAleatoire(): string {
    const index = Math.floor(Math.random() * this.notes.length);
    return this.notes[index];
  }

  getNotesAleatoires(nombre:number): string[] {
    const listeNotes: string[] = [];
    for (let i = 0; i< nombre; i++) {
      listeNotes.push(this.getNoteAleatoire());
    }
    return listeNotes;
  }

}
