import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { EpisodeService } from '../../services/episode.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.css'
})
export class EpisodeDetailComponent implements OnInit {


  episode: any; // Cambia 'any' por el tipo específico de tu personaje
  episodeId: string | any;

  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.episodeId = this.route.snapshot.paramMap.get('id'); // Obtén el ID del personaje desde la URL
    this.fetchEpisodeDetails(this.episodeId);
  }

  fetchEpisodeDetails(id: string) {
    this.episodeService.getById(id).subscribe((data) => {
      this.episode = data; // Asigna los detalles del personaje a la propiedad
    });

  }

  updateEpisode() {

    delete this.episode.id;
    // Realiza la llamada a tu API para actualizar el personaje
    this.episodeService.updateEpisode(this.episodeId, this.episode).subscribe(
      (response) => {
        console.log('Personaje actualizado con éxito', response);
        // Aquí puedes añadir alguna lógica después de la actualización
        this.goBack()
      },
      (error) => {
        console.error('Error al actualizar el personaje', error);
      }
    );
  }

  deleteEpisode() {
    this.episodeService.delete(this.episodeId).subscribe()
    this.goBack()
  }

  goBack() {
    this.router.navigate(['/episodes']); // Redirige a la lista de personajes
  }
}
