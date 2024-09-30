import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';

  constructor(private router: Router) { }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  login() {
    // Aquí iría la lógica de autenticación
    localStorage.setItem('token', 'user_token'); // Simulando la autenticación
    this.router.navigate(['/characters']); // Redirigir después de iniciar sesión
  }

  logout() {
    localStorage.removeItem('token'); // Eliminar el token de autenticación
    this.router.navigate(['/']); // Redirigir al inicio o formulario de login
  }
}
