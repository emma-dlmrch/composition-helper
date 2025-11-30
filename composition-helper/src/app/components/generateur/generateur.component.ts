// src/app/components/generateur/generateur.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrainteService } from '../../services/contrainte.service';
import { Contrainte } from '../../models/contrainte.model';
import { FormsModule } from '@angular/forms';
import { MelodieComponent } from '../melodie/melodie.component';


interface Filtre {
  type: string;
  active: boolean;
}

@Component({
  selector: 'app-generateur',
  standalone: true,
  imports: [CommonModule, FormsModule, MelodieComponent],
  templateUrl: './generateur.component.html',
  styleUrls: ['./generateur.component.scss']
})

export class GenerateurComponent implements OnInit {

  contraintes: Contrainte[] = [];
  typesDisponibles: string[] = [];
  contraintesTirees: Contrainte[] = [];
  filtres: Filtre[] = [];
  estSuiteNotesActif: boolean = false;
  estSuiteNotesAGenerer: boolean = false;

  constructor(private contrainteService: ContrainteService) { }

  async ngOnInit() {
    this.contraintes = await this.contrainteService.chargerContraintes();
    this.typesDisponibles = [...new Set(this.contraintes.map(c => c.type))];
    this.filtres = this.typesDisponibles.map(t => ({ type: t, active: false }));
  }

  generer() {
    // types cochés
    const typesActifs = this.filtres.filter(f => f.active).map(f => f.type);
    // pour chaque type actif, tirer une contrainte au hasard
    this.contraintesTirees = typesActifs.map(type => {
      return this.genererContrainteUnitaire(type);
    }).filter(c => c !== null) as Contrainte[];

    this.estSuiteNotesAGenerer = this.estSuiteNotesActif;
  }

  regenererUnitaire(numLigne: number) {
    const ok = confirm("Voulez-vous régénérer cette contrainte ?");
    if (!ok) return;
    this.contraintesTirees[numLigne] = this.genererContrainteUnitaire(this.contraintesTirees[numLigne].type)
  }

  private genererContrainteUnitaire(type: string): Contrainte {
    const contraintesDuType = this.contraintes.filter(c => c.type === type);
    if (contraintesDuType.length === 0) {
      return {
        type,
        libelle: "aucune contrainte disponible",
      };
    }

    const index = Math.floor(Math.random() * contraintesDuType.length);
    return contraintesDuType[index];
  }
}
