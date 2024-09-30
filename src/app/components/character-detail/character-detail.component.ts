import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css'
})
export class CharacterDetailComponent implements OnInit {
  character: any; // Cambia 'any' por el tipo específico de tu personaje
  characterId: string | any;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get('id'); // Obtén el ID del personaje desde la URL
    this.fetchCharacterDetails(this.characterId);
  }

  fetchCharacterDetails(id: string) {
    this.characterService.getById(id).subscribe((data) => {
      this.character = data; // Asigna los detalles del personaje a la propiedad
    });

    console.log(this.character)
  }

  updateCharacter() {
    // Realiza la llamada a tu API para actualizar el personaje
    this.characterService.updateCharacter(this.character).subscribe(
      (response) => {
        console.log('Personaje actualizado con éxito', response);
        // Aquí puedes añadir alguna lógica después de la actualización
      },
      (error) => {
        console.error('Error al actualizar el personaje', error);
      }
    );
  }

  deleteCharacter() {
    this.characterService.delete(this.characterId).subscribe()
    this.goBack()
  }

  goBack() {
    this.router.navigate(['/characters']); // Redirige a la lista de personajes
  }

}
