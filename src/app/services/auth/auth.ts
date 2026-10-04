import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly chave = 'fcustom_admin_logado';
    private readonly chaveUsuario = 'fcustom_usuario_logado';
    private readonly emailAdmin = 'admin@gmail.com';
    private readonly senhaAdmin = 'fcustom123';

    entrar(email: string, senha: string): boolean {
        if (email.trim().toLowerCase() === this.emailAdmin && senha === this.senhaAdmin) {
            sessionStorage.setItem(this.chave, 'true');
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
    }

    entrarUsuario(email: string, senha: string): boolean {
        const ok = email === localStorage.getItem('fcustom_email')
                && senha === localStorage.getItem('fcustom_senha');

        if (ok) {
            sessionStorage.setItem(this.chaveUsuario, 'true');
        }
        return ok;
    }

    isLogado(): boolean {
        return sessionStorage.getItem(this.chaveUsuario) === 'true';
    }

    contaExiste(email: string): boolean {
        return email === this.emailAdmin
            || email === localStorage.getItem('fcustom_email');
    }

    emailUsuario(): string {
        return localStorage.getItem('fcustom_email') ?? '';
    }

    alterarEmail(email: string): void {
        localStorage.setItem('fcustom_email', email);
    }

    alterarSenha(senha: string): void {
        localStorage.setItem('fcustom_senha', senha);
    }

    excluirConta(): void {
        localStorage.removeItem('fcustom_email');
        localStorage.removeItem('fcustom_senha');
        this.sair();
    }

    sair(): void {
        sessionStorage.removeItem(this.chave);
        sessionStorage.removeItem(this.chaveUsuario);
    }
}