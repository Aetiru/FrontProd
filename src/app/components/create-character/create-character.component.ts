import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { FormsModule } from '@angular/forms';

interface Character {
  name: string;
  status: string;
  species: string;
  gender: string;
  image?: string;
  type?: string;
  url?: string;
  origin: any;
  location: any;
}

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.css'
})
export class CreateCharacterComponent {

  character: Character = {
    name: '',
    status: '',
    species: '',
    gender: '',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    type: 'a',
    url: 'any',
    origin: {
      name: '',
      url: 'aa'
    },
    location: {
      name: '',
      url: 'aa'
    },
  };

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) { }

  goBack() {
    this.router.navigate(['/characters']); // Redirige a la lista de personajes
  }

  createCharacter() {
    console.log(this.character)
    this.characterService.save(this.character).subscribe(
      (response) => {
        console.log('Personaje creado con éxito', response);
        // Aquí puedes redirigir al usuario de vuelta a la lista de personajes o mostrar una notificación
        this.goBack();
      },
      (error) => {
        console.error('Error al crear el personaje', error);
      }
    );
  }
}


