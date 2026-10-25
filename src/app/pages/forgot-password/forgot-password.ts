import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  email: string = '';
  erro: string = '';

  constructor(private auth: AuthService) {}

  enviarLink() {
    if (this.email.trim() === '') {
      this.erro = 'Digite seu e-mail.';
    } else if (!this.auth.validarEmail(this.email)) {
      this.erro = 'Digite um e-mail válido.';
    } else {
      this.erro = '';
      alert('Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.');
    }
  }
}