import { Injectable } from '@angular/core';
import { NOTES, NoteService } from './note.service';
import { Accord } from '../models/accord.model';

export const ACCORDS = {
    maj: [0, 4, 7],       // majeur
    min: [0, 3, 7],       // mineur
    dim: [0, 3, 6],       // diminué
    m7b5: [0, 3, 6, 10],  // demi-diminué
    aug: [0, 4, 8],       // augmenté
    majM7: [0, 4, 7, 11],  // majeur7
    min7: [0, 3, 7, 10],  // mineur7
    minM7: [0, 3, 7, 11],  // mineur maj 7
    sus4: [0, 5, 7, 10],
    maj6: [0, 4, 7, 9],
    min6: [0, 3, 7, 9],
    maj7: [0, 4, 7, 10]
};

export type AccordType = keyof typeof ACCORDS;

@Injectable({ providedIn: 'root' })
export class AccordService {

    constructor(private noteService: NoteService) { }

    genererNotesAccord(racine: string, type: keyof typeof ACCORDS, octave: number = 4): string[] {
        const notes = [];
        const racineIndex = NOTES.indexOf(racine);
        if (racineIndex === -1) throw new Error("Note racine invalide");

        for (const interval of ACCORDS[type]) {
            const noteIndex = (racineIndex + interval) % NOTES.length;
            const noteOctave = octave + Math.floor((racineIndex + interval) / NOTES.length);
            notes.push(`${NOTES[noteIndex]}${noteOctave}`);
        }
        return notes;
    }


    getAccordAleatoire(typesAutorises: (keyof typeof ACCORDS)[]): Accord {
        const type = this.getTypeAleatoire(typesAutorises);
        const racine: string = this.noteService.getNoteAleatoire();

        const accord: Accord = {
            nom: type,
            notes: this.genererNotesAccord(racine, type, 4),
            racine: racine
        }
        return accord;

    }

    getTypeAleatoire(typesAutorises: (keyof typeof ACCORDS)[]) {
        if (typesAutorises.length === 0) {
            throw new Error("Aucun type d'accord n'est autorisé.");
        }
        return typesAutorises[Math.floor(Math.random() * typesAutorises.length)];
    }

    getAccordsAleatoires(nombre: number, typesAutorises: (keyof typeof ACCORDS)[]): Accord[] {
        const listeAccords: Accord[] = [];
        for (let i = 0; i < nombre; i++) {
            listeAccords.push(this.getAccordAleatoire(typesAutorises));
        }
        return listeAccords;
    }

}
