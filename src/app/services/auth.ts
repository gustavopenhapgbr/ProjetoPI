import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { CarrinhoService } from './carrinho';   

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // login do adm
  emailAdm: string = 'admin@gmail.com';
  senhaAdm: string = 'adm123';

  usuarios: Usuario[] = [
    { email: 'cliente@gmail.com', senha: 'cliente123456' }
  ];

  usuarioLogado: string = '';
  adminLogado: boolean = false;
  constructor(private carrinhoService: CarrinhoService) {}

  loginAdmin(email: string, senha: string): boolean {
    if (email === this.emailAdm && senha === this.senhaAdm) {
      this.adminLogado = true;
      this.usuarioLogado = email;
      return true;
    }
    return false;
  }

  loginUsuario(email: string, senha: string): boolean {
    for (let usuario of this.usuarios) {
      if (usuario.email === email && usuario.senha === senha) {
        this.usuarioLogado = email;
        return true;
      }
    }
    return false;
  }

  contaExiste(email: string): boolean {
    if (email === this.emailAdm) {
      return true;
    }
    for (let usuario of this.usuarios) {
      if (usuario.email === email) {
        return true;
      }
    }
    return false;
  }

  estaLogado(): boolean {
    return this.usuarioLogado !== '';
  }

  cadastrar(email: string, senha: string) {
    this.usuarios.push({ email: email, senha: senha });
    this.usuarioLogado = email;
  }

  alterarEmail(emailNovo: string) {
    for (let usuario of this.usuarios) {
      if (usuario.email === this.usuarioLogado) {
        usuario.email = emailNovo;
      }
    }
    this.usuarioLogado = emailNovo;
  }

  alterarSenha(senhaNova: string) {
    for (let usuario of this.usuarios) {
      if (usuario.email === this.usuarioLogado) {
        usuario.senha = senhaNova;
      }
    }
  }

  excluirConta() {
    let listaNova: Usuario[] = [];
    for (let usuario of this.usuarios) {
      if (usuario.email !== this.usuarioLogado) {
        listaNova.push(usuario);
      }
    }
    this.usuarios = listaNova;
    this.sair();
  }

  sair() {
    this.usuarioLogado = '';
    this.adminLogado = false;
    this.carrinhoService.limpar();
  }

  validarEmail(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }
}
