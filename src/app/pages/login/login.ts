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
    } else if (this.auth.entrarUsuario(this.email, this.senha)) {
      this.router.navigate(['/']);
    } else if (!this.auth.contaExiste(this.email)) {
      alert('Não existe uma conta com esse e-mail.');
    } else {
      alert('Senha incorreta.');
    }
  }
}