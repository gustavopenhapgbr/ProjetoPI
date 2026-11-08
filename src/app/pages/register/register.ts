import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  erro: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  cadastrar() {
    if (this.email.trim() === '') {
      this.erro = 'Digite seu e-mail.';
    } else if (!this.auth.validarEmail(this.email)) {
      this.erro = 'Digite um e-mail válido.';
    } else if (this.senha === '') {
      this.erro = 'Digite uma senha.';
    } else if (this.senha.length < 6) {
      this.erro = 'A senha precisa ter pelo menos 6 caracteres.';
    } else if (this.confirmarSenha === '') {
      this.erro = 'Confirme sua senha.';
    } else if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não são iguais.';
    } else {
      this.erro = '';
      this.verificarEmailECadastrar();
    }
  }

  verificarEmailECadastrar() {
    if (this.email === this.auth.emailAdm) {
      this.erro = 'Já existe uma conta com esse e-mail.';
      return;
    }

    this.auth.listar().subscribe({
      next: (usuarios) => {
        for (let usuario of usuarios) {
          if (usuario.email === this.email) {
            this.erro = 'Já existe uma conta com esse e-mail.';
            return;
          }
        }

        this.auth.incluir({ id: String (usuarios.length+1), email: this.email, senha: this.senha }).subscribe({
          next: (usuarioCriado) => {
            this.auth.registrarLogin(usuarioCriado);
            alert('Conta criada! Bem-vindo à F.Company.');
            this.router.navigate(['/']);
          },
          error: () => alert('Erro ao criar a conta.')
        });
      },
      error: () => alert('Deu erro')
    });
  }
}