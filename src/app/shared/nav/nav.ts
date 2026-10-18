import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  itensMenu = [
    { label: 'Camisetas', link: '/camisetas' },
    {label: 'Calças', link: '/calcas'},
    { label: 'Shorts', link: '/shorts' },
    { label: 'Conjuntos', link: '/conjuntos' },
    { label: 'Acessórios', link: '/acessorios' }
  ];
}
