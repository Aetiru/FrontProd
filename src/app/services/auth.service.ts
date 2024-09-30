import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.staging';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl

  constructor(private router: Router, private http: HttpClient) { }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Simular inicio de sesión
  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.url}auth/login`, { username, password })
      .pipe(
        tap(response => {
          // Almacenar el token en localStorage
          localStorage.setItem('token', response.token);
          this.router.navigate(['/characters']); // Redirigir después de iniciar sesión
        }),
        catchError(error => {
          // Manejo de errores
          console.error('Error de autenticación', error);
          return throwError(error);
        })
      );
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']); // Redirigir después de cerrar sesión
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}
