import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import Papa from 'papaparse';
import { Contrainte } from '../models/contrainte.model';

@Injectable({ providedIn: 'root' })
export class ContrainteService {

  constructor(private http: HttpClient) {}

  async chargerContraintes(): Promise<Contrainte[]> {
    const csv = await firstValueFrom(
      this.http.get('assets/contraintes.csv', { responseType: 'text' })
    );

    const result = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true
    });

    return result.data.map((item: any) => ({
      type: item['Type'],
      libelle: item['Contrainte']
    }));
  }
}
