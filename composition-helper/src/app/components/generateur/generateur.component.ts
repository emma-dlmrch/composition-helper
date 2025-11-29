// src/app/components/generateur/generateur.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrainteService } from '../../services/contrainte.service';
import { Contrainte } from '../../models/contrainte.model';
import { FormsModule } from '@angular/forms';


interface Filtre {
  type: string;
  active: boolean;
}

@Component({
  selector: 'app-generateur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generateur.component.html',
  styleUrls: ['./generateur.component.scss']
})

export class GenerateurComponent implements OnInit {
  
  contraintes: Contrainte[] = [];
  typesDisponibles: string[] = [];
  contraintesTirees: Contrainte[] = [];
  filtres: Filtre[] = [];

  constructor(private contrainteService: ContrainteService) {}

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
    const contraintesDuType = this.contraintes.filter(c => c.type === type);
    if (contraintesDuType.length === 0) return null;

    const index = Math.floor(Math.random() * contraintesDuType.length);
    return contraintesDuType[index];
  }).filter(c => c !== null) as Contrainte[];
}
}
