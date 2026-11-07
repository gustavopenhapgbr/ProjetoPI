import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  senha: string = '';
  botaoDesabilitado: boolean = true;

  constructor(private auth: AuthService, private router: Router) { }

  validarFormulario() {
    if (this.email.trim() !== '' && this.senha.trim() !== '') {
      this.botaoDesabilitado = false;
    } else {
      this.botaoDesabilitado = true;
    }
  }

  entrar() {
    if (this.auth.loginAdmin(this.email, this.senha)) {
      this.router.navigate(['/admin']);
      return;
    }

    this.auth.listar().subscribe({
      next: (usuarios) => {
        let emailExiste = false;

        for (let usuario of usuarios) {
          if (usuario.email === this.email) {
            emailExiste = true;
            if (usuario.senha === this.senha) {
              this.auth.registrarLogin(usuario);
              this.router.navigate(['/']);
              return;
            }
          }
        }

        if (emailExiste) {
          alert('Senha incorreta.');
        } else {
          alert('Não existe uma conta com esse e-mail.');
        }
      },
      error: () => alert('Deu erro ')
    });
  }
}