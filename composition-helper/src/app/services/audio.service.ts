import { Injectable } from '@angular/core';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private synth: Tone.Synth;
  private polySynth: Tone.PolySynth;

  constructor() {
    // Synth mono pour jouer une seule note
    this.synth = new Tone.Synth().toDestination();

    // Synth polyphonique pour jouer un accord (plusieurs notes)
    this.polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
  }

  /**
   * Joue une note (ex: "C4", "G#3")
   */
  async playNote(note: string, duration: string = "8n") {
    await Tone.start(); // nécessaire sur navigateur
    this.synth.triggerAttackRelease(note, duration);
  }

  /**
   * Joue un accord : tableau de notes (ex: ["C4", "E4", "G4"])
   */
  async playChord(notes: string[], duration: string = "1n") {
    await Tone.start();
    this.polySynth.triggerAttackRelease(notes, duration);
  }
}
