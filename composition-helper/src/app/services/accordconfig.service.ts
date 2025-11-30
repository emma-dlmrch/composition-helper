import { Injectable } from '@angular/core';
import { ACCORDS, AccordType } from './accord.service';

@Injectable({ providedIn: 'root' })
export class AccordConfigService {

    //ça serait bien dans le local storage
    typesAccords = Object.keys(ACCORDS) as (keyof typeof ACCORDS)[];

    accordsAutorises: Record<AccordType, boolean> = {} as Record<AccordType, boolean>;

    constructor() {
        // par défaut, on active tous les accords
        Object.keys(ACCORDS).forEach((key) => {
            const k = key as AccordType;
            this.accordsAutorises[k] = true;
        });

        // désactiver certains par défaut
        this.accordsAutorises.min7 = false;
        this.accordsAutorises.minM7 = false;
    }

    getTypesAutorises(): (keyof typeof ACCORDS)[] {
        return this.typesAccords.filter(t => this.accordsAutorises[t]);
    }
}
