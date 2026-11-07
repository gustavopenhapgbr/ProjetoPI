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
    this.email = this.auth.emailLogado();
  }

  editarEmail() {
    this.novoEmail = this.email;
    this.erroEmail = '';
    this.editandoEmail = true;
  }

  salvarEmail() {
    let usuario = this.auth.usuarioLogado;
    if (usuario === null) {
      return;
    }

    if (!this.auth.validarEmail(this.novoEmail)) {
      this.erroEmail = 'Digite um e-mail válido.';
      return;
    }

    this.auth.listar().subscribe({
      next: (usuarios) => {
        for (let outro of usuarios) {
          if (outro.email === this.novoEmail && outro.id !== usuario.id) {
            this.erroEmail = 'Já existe uma conta com esse e-mail.';
            return;
          }
        }

        this.auth.editar({ id: usuario.id, email: this.novoEmail, senha: usuario.senha }).subscribe({
          next: (usuarioAtualizado) => {
            this.auth.registrarLogin(usuarioAtualizado);
            this.email = usuarioAtualizado.email;
            this.editandoEmail = false;
          },
          error: () => alert('Erro ao alterar o e-mail.')
        });
      },
      error: () => alert('Não foi possível conectar ao servidor.')
    });
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
    let usuario = this.auth.usuarioLogado;
    if (usuario === null) {
      return;
    }

    if (this.novaSenha.length < 6) {
      this.erroSenha = 'A senha precisa ter pelo menos 6 caracteres.';
      return;
    }

    this.auth.editar({ id: usuario.id, email: usuario.email, senha: this.novaSenha }).subscribe({
      next: (usuarioAtualizado) => {
        this.auth.registrarLogin(usuarioAtualizado);
        this.editandoSenha = false;
        alert('Senha alterada.');
      },
      error: () => alert('Erro ao alterar a senha.')
    });
  }

  cancelarSenha() {
    this.editandoSenha = false;
  }

  sair() {
    this.auth.sair();
    this.router.navigate(['/login']);
  }

  excluirConta() {
    let usuario = this.auth.usuarioLogado;
    if (usuario === null || usuario.id === undefined) {
      return;
    }

    let confirmou = confirm('Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.');
    if (confirmou) {
      this.auth.excluir(usuario.id).subscribe({
        next: () => {
          this.auth.sair();
          alert('Conta excluída.');
          this.router.navigate(['/']);
        },
        error: () => alert('Erro ao excluir a conta.')
      });
    }
  }
}