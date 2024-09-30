import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  

  logout() {
    this.authService.logout();
  }

  goToCreate() {
    this.router.navigate(['/characters/create']);
  }

  goCharacter() {
    this.router.navigate(['/characters']);
  }

  gotEpisodes() {
    this.router.navigate(['/episodes']);

  }

  goToCreateEp() {
    this.router.navigate(['/episodes/create']);
  }

  goTo() {
    this.router.navigate(['/characters']);
  }


}
