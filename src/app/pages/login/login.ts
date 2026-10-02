import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  email = '';
  senha = '';
  constructor(private auth: AuthService, private router: Router) { }

  entrar(): void {
    if (this.auth.entrar(this.email, this.senha)) {
      this.router.navigate(['/admin']);
    } else {
      alert('E-mail ou senha incorretos.');
    }
  }
}