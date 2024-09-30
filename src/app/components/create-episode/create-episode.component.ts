import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EpisodeService } from '../../services/episode.service';
import { Router } from '@angular/router';

interface Episode {
  name: string;
  airDate: Date;
  characters: any
  episodeCode: string;
  url: string;
  created: Date
}
@Component({
  selector: 'app-create-episode',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-episode.component.html',
  styleUrl: './create-episode.component.css'
})
export class CreateEpisodeComponent {
  episode: Episode = {
    name: '',
    airDate: new Date(),
    episodeCode: '',
    characters: ["https://rickandmortyapi.com/api/character/1"],
    url: 'a',
    created: new Date(),

  };

  constructor(
    private episodeService: EpisodeService,
    private router: Router
  ) { }

  goBack() {
    this.router.navigate(['/episodes']); // Redirige a la lista de personajes
  }

  createEpisode() {
    console.log(this.episode)
    this.episodeService.save(this.episode).subscribe(
      (response) => {
        console.log('Episodio creado con éxito', response);
        // Aquí puedes redirigir al usuario de vuelta a la lista de personajes o mostrar una notificación
        this.goBack();
      },
      (error) => {
        console.error('Error al crear el Episodio', error);
      }
    );
  }


}
