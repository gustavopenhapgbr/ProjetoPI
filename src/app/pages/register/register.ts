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

  constructor(private auth: AuthService, private router: Router) {}

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
    } else if (this.auth.contaExiste(this.email)) {
      this.erro = 'Já existe uma conta com esse e-mail.';
    } else {
      this.erro = '';
      this.auth.cadastrar(this.email, this.senha);
      alert('Conta criada! Bem-vindo à F.Company.');
      this.router.navigate(['/']);
    }
  }
}