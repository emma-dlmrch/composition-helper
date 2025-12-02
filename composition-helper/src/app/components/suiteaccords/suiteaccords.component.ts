import { Component, OnInit } from '@angular/core';
import { Accord } from '../../models/accord.model';
import { ACCORDS, AccordService } from '../../services/accord.service';
import { AudioService } from '../../services/audio.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccordConfigService } from '../../services/accordconfig.service';
import { LongPressDirective } from '../../directives/longpress.directive';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-suiteaccords',
  standalone: true,
  imports: [CommonModule, FormsModule, LongPressDirective],
  templateUrl: './suiteaccords.component.html',
  styleUrl: './suiteaccords.component.scss'
})

export class SuiteaccordsComponent implements OnInit {

  accords: Accord[] = [];

  //popup modif
  accordAModifier: Accord | null = null;
  showEditMenu = false;

  constructor(private accordService: AccordService, private noteService: NoteService, private audioService: AudioService, public accordConfigService: AccordConfigService) { }

  ngOnInit(): void {
    this.generer()
  }

  generer() {
    this.accords = this.accordService.getAccordsAleatoires(this.accordConfigService.nbAccords, this.accordConfigService.getTypesAutorises());
  }

  play(accord: Accord) {
    this.audioService.playChord(accord.notes, "0.4");
  }

  //menu de modif
  modifierAccord(accord: Accord) {
    this.accordAModifier = accord;
    this.showEditMenu = true;
  }
  fermerMenu() {
    this.showEditMenu = false;
    this.accordAModifier = null;
  }

  regenererRacine() {
    if (!this.accordAModifier) return;
    const typeAccord = this.accordAModifier.nom as keyof typeof ACCORDS;

    this.accordAModifier.racine = this.noteService.getNoteAleatoire();
        this.accordAModifier.notes = this.accordService.genererNotesAccord(
      this.accordAModifier.racine,
      typeAccord
    );
    this.fermerMenu();
  }

  regenererType() {
    if (!this.accordAModifier) return;
    const type = this.accordService.getTypeAleatoire(this.accordConfigService.getTypesAutorises())
    this.accordAModifier.nom = type;
    this.accordAModifier.notes = this.accordService.genererNotesAccord(
      this.accordAModifier.racine,
      type
    );

    this.fermerMenu();
  }

  regenererTout() {
    if (!this.accordAModifier) return;
    const nouvelAccord =  this.accordService.getAccordAleatoire(this.accordConfigService.getTypesAutorises());

    this.accordAModifier.nom = nouvelAccord.nom;
    this.accordAModifier.notes = nouvelAccord.notes;
    this.accordAModifier.racine = nouvelAccord.racine;

    this.fermerMenu();
  }

}
