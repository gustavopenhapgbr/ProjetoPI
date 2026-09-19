import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Camisetas } from './pages/produtos/camisetas/camisetas';
import { Calcas } from './pages/produtos/calcas/calcas';
import { Shorts } from './pages/produtos/shorts/shorts';
import { Conjuntos } from './pages/produtos/conjuntos/conjuntos';
import { Acessorios } from './pages/produtos/acessorios/acessorios';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'camisetas', component:Camisetas},
    {path:'calcas', component:Calcas},
    {path:'shorts', component:Shorts},
    {path:'conjuntos', component:Conjuntos},
    {path:'acessorios', component:Acessorios}
];
