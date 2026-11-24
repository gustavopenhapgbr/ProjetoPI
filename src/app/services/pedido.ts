import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly API = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API);
  }

  incluir(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.API, pedido);
  }
}