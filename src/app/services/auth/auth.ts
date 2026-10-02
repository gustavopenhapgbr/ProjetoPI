import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly chave = 'fcustom_admin_logado';
    private readonly emailAdmin = 'admin@gmail.com';
    private readonly senhaAdmin = 'fcustom123';
    entrar(email: string, senha: string): boolean {
        if (email.trim().toLowerCase() === this.emailAdmin && senha === this.senhaAdmin) {
            sessionStorage.setItem(this.chave, 'true');
            return true;
        }
        return false;
    }

    sair(): void {
        sessionStorage.removeItem(this.chave);
    }

    isAdmin(): boolean {
        return sessionStorage.getItem(this.chave) === 'true';
    }
}