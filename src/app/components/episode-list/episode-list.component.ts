import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpisodeService } from '../../services/episode.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.css'
})
export class EpisodeListComponent implements OnInit {
  episodes: any[] = [];
  searchTerm: string = '';
  totalCount: any;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(

    private router: Router,

    private episodeservice: EpisodeService

  ) { }

  ngOnInit() {
    this.loadepisodes();
  }

  loadepisodes() {

    this.episodeservice.getAll(this.currentPage, this.pageSize, this.searchTerm).subscribe((response: any) => {
      this.episodes = response.data;
      this.totalCount = response.totalCount; // Almacena el total de personajes
      this.totalPages = Math.ceil(response.totalCount / this.pageSize);

    }, (error: any) => {
      console.error('Error loading episodes:', error);
    });

  }

  updatePagination() {
    const pagesArray = [];
    for (let i = Math.max(1, this.currentPage - 2); i <= Math.min(this.totalPages, this.currentPage + 2); i++) {
      pagesArray.push(i);
    }
    this.pages = pagesArray;
  }

  searchepisodes() {
    this.currentPage = 1;
    this.loadepisodes();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadepisodes();
    }
  }

  goToEpisodeDetail(characterId: number) {
    this.router.navigate(['/episodes/', characterId]);
  }

  goToFirstPage() {
    this.changePage(1);
  }

  goToLastPage() {
    this.changePage(this.totalPages);
  }

  formatDate(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  }
}
