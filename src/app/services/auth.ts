import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { CarrinhoService } from './carrinho';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // cria Api de usuarios para ser utilizada
  private API = 'http://localhost:3000/usuarios';

  // login do adm
  emailAdm: string = 'admin@gmail.com';
  senhaAdm: string = 'adm123';

  usuarioLogado: Usuario | null = null; //Devolve usuario inteiro ou vazio
  adminLogado: boolean = false;
  constructor(private http: HttpClient, private carrinhoService: CarrinhoService) { }

  // métodos

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API); // this api indica onde vai o endereço onde a requisição vai ser enviada. 
  }

  incluir(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario);
  }

  editar(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.API}/${usuario.id}`, usuario);
  }

  excluir(id:String): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.API}/${id}`);
  }

  registrarLogin(usuario:Usuario){
    this.usuarioLogado = usuario;    // Registra o usuario que está logado
  }

  loginAdmin(email: string, senha: string): boolean {
    if (email === this.emailAdm && senha === this.senhaAdm) {
      this.adminLogado = true;
      return true;
    }
    return false;
  }


  estaLogado(): boolean {
    return this.adminLogado || this.usuarioLogado != null; // pega adm logado ou o usuarioLogado
  }

  emailLogado(): string {
    if(this.adminLogado){
      return this.emailAdm;
    }

    if(this.usuarioLogado){
      return this.usuarioLogado.email;
    }

    return "";
  }
  
  sair() {
    this.usuarioLogado = null;
    this.adminLogado = false;
    this.carrinhoService.limpar();
  }

  validarEmail(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }
}
