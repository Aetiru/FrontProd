import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Importa los estilos CSS

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  notyf = new Notyf();


  constructor(private router: Router,

    private authService: AuthService,

  ) { }

  login() {
    // Llamar al servicio de autenticación
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.notyf.success('Inicio de sesión exitoso'); // Muestra la notificación de éxito
        // Redirección ya manejada en el servicio
      },
      error => {
        // Manejar errores de inicio de sesión aquí
        this.notyf.error('Credenciales incorrectas'); // Muestra la notificación de éxito

        this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.'; // Mensaje de error
        console.error('Error de inicio de sesión', error);
      }
    );
  }
}
