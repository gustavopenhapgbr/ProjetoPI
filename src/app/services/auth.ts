import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { CarrinhoService } from './carrinho';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:3000/usuarios';

  emailAdmin: string = '';

  usuarioLogado: Usuario | null = null;
  adminLogado: boolean = false;
  constructor(private http: HttpClient, private carrinhoService: CarrinhoService) { }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  buscarPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/${id}`);
  }

  incluir(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario);
  }

  editar(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API}/${usuario.id}`, usuario);
  }

  excluir(id: String): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.API}/${id}`);
  }

  registrarLogin(usuario: Usuario) {
    this.usuarioLogado = usuario;
  }

  loginAdmin(usuario: Usuario) {
    this.adminLogado = true;
    this.emailAdmin = usuario.email;
  }

  estaLogado(): boolean {
    return this.adminLogado || this.usuarioLogado != null;
  }

  emailLogado(): string {
    if (this.adminLogado) {
      return this.emailAdmin;
    }

    if (this.usuarioLogado) {
      return this.usuarioLogado.email;
    }

    return "";
  }

  sair() {
    this.usuarioLogado = null;
    this.adminLogado = false;
    this.emailAdmin = '';
    this.carrinhoService.limpar();
  }

  validarEmail(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }
}