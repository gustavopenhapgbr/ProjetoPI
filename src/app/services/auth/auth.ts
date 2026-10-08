import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly chave = 'fcustom_admin_logado';
  private readonly chaveUsuario = 'fcustom_usuario_logado';
  private readonly emailAdmin = 'admin@gmail.com';
  private readonly senhaAdmin = 'fcustom123';

  readonly usuarioLogado = signal<string>(this.lerUsuarioLogado());

  private lerUsuarioLogado(): string {
    if (sessionStorage.getItem(this.chave) === 'true') return this.emailAdmin;
    if (sessionStorage.getItem(this.chaveUsuario) === 'true') {
      return localStorage.getItem('fcustom_email') ?? '';
    }
    return '';
  }

  entrar(email: string, senha: string): boolean {
    if (email.trim().toLowerCase() === this.emailAdmin && senha === this.senhaAdmin) {
      sessionStorage.setItem(this.chave, 'true');
      this.usuarioLogado.set(this.emailAdmin);
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    return sessionStorage.getItem(this.chave) === 'true';
  }

  cadastrar(email: string, senha: string): void {
    localStorage.setItem('fcustom_email', email);
    localStorage.setItem('fcustom_senha', senha);
    sessionStorage.setItem(this.chaveUsuario, 'true');
    this.usuarioLogado.set(email);
  }

  entrarUsuario(email: string, senha: string): boolean {
    const ok =
      email === localStorage.getItem('fcustom_email') &&
      senha === localStorage.getItem('fcustom_senha');

    if (ok) {
      sessionStorage.setItem(this.chaveUsuario, 'true');
      this.usuarioLogado.set(email);
    }
    return ok;
  }

  isLogado(): boolean {
    return this.isAdmin() || sessionStorage.getItem(this.chaveUsuario) === 'true';
  }

  contaExiste(email: string): boolean {
    return (
      email === this.emailAdmin ||
      email === localStorage.getItem('fcustom_email')
    );
  }

  emailUsuario(): string {
    if (this.isAdmin()) {
      return this.emailAdmin;
    }
    return localStorage.getItem('fcustom_email') ?? '';
  }

  alterarEmail(email: string): void {
    const antigo = localStorage.getItem('fcustom_email');
    localStorage.setItem('fcustom_email', email);

    if (antigo && antigo !== email) {
      const carrinho = localStorage.getItem('fcustom_carrinho_' + antigo);
      if (carrinho) {
        localStorage.setItem('fcustom_carrinho_' + email, carrinho);
        localStorage.removeItem('fcustom_carrinho_' + antigo);
      }
    }
    if (this.usuarioLogado() === antigo) this.usuarioLogado.set(email);
  }

  alterarSenha(senha: string): void {
    localStorage.setItem('fcustom_senha', senha);
  }

  excluirConta(): void {
    const email = localStorage.getItem('fcustom_email');
    if (email) localStorage.removeItem('fcustom_carrinho_' + email);
    localStorage.removeItem('fcustom_email');
    localStorage.removeItem('fcustom_senha');
    this.sair();
  }

  sair(): void {
    sessionStorage.removeItem(this.chave);
    sessionStorage.removeItem(this.chaveUsuario);
    this.usuarioLogado.set('');
  }
}