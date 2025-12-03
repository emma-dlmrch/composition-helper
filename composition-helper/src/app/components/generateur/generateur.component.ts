// src/app/components/generateur/generateur.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrainteService } from '../../services/contrainte.service';
import { Contrainte } from '../../models/contrainte.model';
import { FormsModule } from '@angular/forms';
import { MelodieComponent } from '../melodie/melodie.component';
import { SuiteaccordsComponent } from '../suiteaccords/suiteaccords.component';
import { ParametrageComponent } from '../parametrage/parametrage.component';


interface Filtre {
  type: string;
  active: boolean;
}

@Component({
  selector: 'app-generateur',
  standalone: true,
  imports: [CommonModule, FormsModule, MelodieComponent, SuiteaccordsComponent, ParametrageComponent],
  templateUrl: './generateur.component.html',
  styleUrls: ['./generateur.component.scss']
})

export class GenerateurComponent implements OnInit {

  contraintes: Contrainte[] = [];
  typesDisponibles: string[] = [];
  contraintesTirees: Contrainte[] = [];
  filtres: Filtre[] = [];
  //suite de notes
  estSuiteNotesActif: boolean = false;
  estSuiteNotesAGenerer: boolean = false;
  //suite d'accords
  estSuiteAccordsActif: boolean = false;
  estSuiteAccordsAGenerer: boolean = false;

  showSettings: boolean = false;
  showResults: boolean = false;

  //pour focus
  @ViewChild('resultSection') resultSection!: ElementRef<HTMLElement>;

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
    this.estSuiteAccordsAGenerer = this.estSuiteAccordsActif;

    //FOCUS
    this.showResults = true;
    setTimeout(() => {
      const el = this.resultSection.nativeElement;

      // Focus
      el.focus();

      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'  // le place en haut de la page
      });
    });
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
