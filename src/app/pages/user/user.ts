import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-user',
  imports: [RouterLink, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})

export class User {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = this.auth.emailUsuario();

  editandoEmail = false;
  novoEmail = '';
  erroEmail = '';

  editandoSenha = false;
  novaSenha = '';
  erroSenha = '';

  editarEmail() {
    this.novoEmail = this.email;
    this.erroEmail = '';
    this.editandoEmail = true;
  }

  salvarEmail() {
    const valido = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.novoEmail);
    if (!valido) {
      this.erroEmail = 'Digite um e-mail válido.';
      return;
    }

    this.auth.alterarEmail(this.novoEmail);
    this.email = this.novoEmail;
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
      return;
    }

    this.auth.alterarSenha(this.novaSenha);
    this.editandoSenha = false;
    alert('Senha alterada.');
  }

  sair() {
    this.auth.sair();
    this.router.navigate(['/login']);
  }

  excluirConta() {
    const confirmou = confirm('Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.');
    if (!confirmou) return;

    this.auth.excluirConta();
    alert('Conta excluída.');
    this.router.navigate(['/']);
  }
}