import { Injectable } from '@angular/core';
import { ACCORDS, AccordType } from './accord.service';

@Injectable({ providedIn: 'root' })
export class AccordConfigService {

    //ça serait bien dans le local storage
    private STORAGE_KEY = 'accordConfig';

    typesAccords = Object.keys(ACCORDS) as (keyof typeof ACCORDS)[];

    accordsAutorises: Record<AccordType, boolean> = {} as Record<AccordType, boolean>;
    nbNotes: number = 3;
    nbAccords: number = 3;

    constructor() {
        this.load();
    }

    /** Charge la config depuis localStorage */
    private load() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (!data) {
            this.resetDefaults();
            return;
        }

        try {
            const parsed = JSON.parse(data);

            this.accordsAutorises = parsed.accordsAutorises ?? this.defaultAccordsAutorises();
            this.nbNotes = parsed.nbNotes ?? 3;
            this.nbAccords = parsed.nbAccords ?? 3;
        } catch {
            this.resetDefaults();
        }
    }

    save() {
        const data = {
            accordsAutorises: this.accordsAutorises,
            nbNotes: this.nbNotes,
            nbAccords: this.nbAccords,
        };

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }

    /** Réinitialise si problème */
    private resetDefaults() {
        this.accordsAutorises = this.defaultAccordsAutorises();
        this.nbNotes = 3;
        this.nbAccords = 3;
        this.save();
    }

    /** génère les valeurs par défaut */
    private defaultAccordsAutorises(): Record<AccordType, boolean> {
        return Object.fromEntries(
            this.typesAccords.map(type => [type, true])
        ) as Record<AccordType, boolean>;
    }


    getTypesAutorises(): (keyof typeof ACCORDS)[] {
        return this.typesAccords.filter(t => this.accordsAutorises[t]);
    }

    changeNbNotes(nb: number) {
        this.nbNotes = nb;
    }

    changeNbAccords(nb: number) {
        this.nbAccords = nb;
    }
}
