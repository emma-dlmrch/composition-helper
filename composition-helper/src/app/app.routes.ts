import { Routes } from '@angular/router';
import { GenerateurComponent } from './components/generateur/generateur.component';
import { ExerciceComponent } from './components/exercice/exercice.component';

export const routes: Routes = [
    { path : '' , component: GenerateurComponent},
    {path : 'exercice', component: ExerciceComponent}
];
