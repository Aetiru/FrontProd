import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {

  characters: any[] = [];
  searchTerm: string = '';
  totalCount: any;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(

    private router: Router,

    private characterService: CharacterService

  ) { }

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {

    this.characterService.getAll(this.currentPage, this.pageSize, this.searchTerm).subscribe((response: any) => {
      this.characters = response.data;
      this.totalCount = response.totalCount; // Almacena el total de personajes
      this.totalPages = Math.ceil(response.totalCount / this.pageSize);

    }, (error: any) => {
      console.error('Error loading characters:', error);
    });

  }

  updatePagination() {
    const pagesArray = [];
    for (let i = Math.max(1, this.currentPage - 2); i <= Math.min(this.totalPages, this.currentPage + 2); i++) {
      pagesArray.push(i);
    }
    this.pages = pagesArray;
  }

  searchCharacters() {
    this.currentPage = 1;
    this.loadCharacters();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCharacters();
    }
  }

  goToCharacterDetail(characterId: number) {
    this.router.navigate(['/characters/', characterId]);
  }

  goToFirstPage() {
    this.changePage(1);
  }

  goToLastPage() {
    this.changePage(this.totalPages);
  }
}
