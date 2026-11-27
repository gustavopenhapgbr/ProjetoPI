import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  email: string = '';
  botaoDesabilitado: boolean = true;

  constructor(private auth: AuthService) {}

  validarFormulario() {
    if (this.email.trim() !== '') {
      this.botaoDesabilitado = false;
    } else {
      this.botaoDesabilitado = true;
    }
  }

  enviarLink() {
    if (this.email.trim() === '') {
      alert('Digite seu e-mail.');
    } else if (!this.auth.validarEmail(this.email)) {
      alert('Digite um e-mail válido.');
    } else {
      alert('Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.');
    }
  }
}
