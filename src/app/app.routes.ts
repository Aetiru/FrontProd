import { NgModule, NgModuleRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login por defecto
  {
    path: 'characters',
    component: CharacterListComponent,
    canActivate: [AuthGuard] // Protege la ruta con el guard de autenticación
  },
  {
    path: 'characters/create',
    loadComponent: () => import('./components/create-character/create-character.component')
      .then(m => m.CreateCharacterComponent),
    canActivate: [AuthGuard] // Protege la ruta con el guard de autenticación
  },
  {
    path: 'characters/:id',
    loadComponent: () => import('./components/character-detail/character-detail.component')
      .then(m => m.CharacterDetailComponent),
    canActivate: [AuthGuard] // Protege la ruta con el guard de autenticación
  },

  {
    path: 'episodes',
    loadComponent: () => import('./components/episode-list/episode-list.component')
      .then(m => m.EpisodeListComponent),
    canActivate: [AuthGuard] // Protege la ruta con el guard de autenticación
  },
  {
    path: 'episodes/create',
    loadComponent: () => import('./components/create-episode/create-episode.component')
      .then(m => m.CreateEpisodeComponent),
    canActivate: [AuthGuard] // Protege la ruta con el guard de autenticación
  },
  {
    path: 'episodes/:id',
    loadComponent: () => import('./components/episode-detail/episode-detail.component')
      .then(m => m.EpisodeDetailComponent),
    canActivate: [AuthGuard] // Protege la ruta con el guard de autenticación
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class appRoutingModule { }
