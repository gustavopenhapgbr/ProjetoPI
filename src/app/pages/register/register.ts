import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register {
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  botaoDesabilitado: boolean = true;

  constructor(private auth: AuthService, private router: Router) { }

  validarFormulario() {
    if (this.email.trim() !== '' && this.senha.trim() !== '' && this.confirmarSenha.trim() !== '') {
      this.botaoDesabilitado = false;
    } else {
      this.botaoDesabilitado = true;
    }
  }

  cadastrar() {
    if (this.email.trim() === '') {
      alert('Digite seu e-mail.');
    } else if (!this.auth.validarEmail(this.email)) {
      alert('Digite um e-mail válido.');
    } else if (this.senha === '') {
      alert('Digite uma senha.');
    } else if (this.senha.length < 6) {
      alert('A senha precisa ter pelo menos 6 caracteres.');
    } else if (this.confirmarSenha === '') {
      alert('Confirme sua senha.');
    } else if (this.senha !== this.confirmarSenha) {
      alert('As senhas não são iguais.');
    } else {
      this.verificarEmailECadastrar();
    }
  }

  verificarEmailECadastrar() {
    this.auth.listar().subscribe({
      next: (usuarios) => {
        for (let usuario of usuarios) {
          if (usuario.email === this.email) {
            alert('Já existe uma conta com esse e-mail.');
            return;
          }
        }

        this.auth.incluir({ email: this.email, senha: this.senha }).subscribe({
          next: (usuarioCriado) => {
            this.auth.registrarLogin(usuarioCriado);
            alert('Conta criada! Bem-vindo à F Company.');
            this.router.navigate(['/']);
          },
          error: () => alert('Erro ao criar a conta.')
        });
      },
      error: () => alert('Erro ao conectar ao servidor.')
    });
  }
}
