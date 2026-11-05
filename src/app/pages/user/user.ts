import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-user',
  imports: [FormsModule, RouterLink],
  templateUrl: './user.html',
  styleUrl: './user.css',
})

export class User {
  email: string = '';

  editandoEmail: boolean = false;
  novoEmail: string = '';
  erroEmail: string = '';

  editandoSenha: boolean = false;
  novaSenha: string = '';
  erroSenha: string = '';

  constructor(public auth: AuthService, private router: Router) {
    this.email = this.auth.usuarioLogado;
  }

  editarEmail() {
    this.novoEmail = this.email;
    this.erroEmail = '';
    this.editandoEmail = true;
  }

  salvarEmail() {
    if (!this.auth.validarEmail(this.novoEmail)) {
      this.erroEmail = 'Digite um e-mail válido.';
    } else if (this.novoEmail !== this.email && this.auth.contaExiste(this.novoEmail)) {
      this.erroEmail = 'Já existe uma conta com esse e-mail.';
    } else {
      this.auth.alterarEmail(this.novoEmail);
      this.email = this.novoEmail;
      this.editandoEmail = false;
    }
  }

  cancelarEmail() {
    this.editandoEmail = false;
  }

  editarSenha() {
    this.novaSenha = '';
    this.erroSenha = '';
    this.editandoSenha = true;
  }

  salvarSenha() {
    if (this.novaSenha.length < 6) {
      this.erroSenha = 'A senha precisa ter pelo menos 6 caracteres.';
    } else {
      this.auth.alterarSenha(this.novaSenha);
      this.editandoSenha = false;
      alert('Senha alterada.');
    }
  }

  cancelarSenha() {
    this.editandoSenha = false;
  }

  sair() {
    this.auth.sair();
    this.router.navigate(['/login']);
  }

  excluirConta() {
    let confirmou = confirm('Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.');
    if (confirmou) {
      this.auth.excluirConta();
      alert('Conta excluída.');
      this.router.navigate(['/']);
    }
  }
}