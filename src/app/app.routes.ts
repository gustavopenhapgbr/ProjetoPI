import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Camisetas } from './pages/produtos/camisetas/camisetas';
import { Calcas } from './pages/produtos/calcas/calcas';
import { Shorts } from './pages/produtos/shorts/shorts';
import { Conjuntos } from './pages/produtos/conjuntos/conjuntos';
import { Acessorios } from './pages/produtos/acessorios/acessorios';
import { Login } from './pages/login/login';
import { Admin } from './pages/admin/admin';
import { adminGuard } from './services/auth/admin-guard';
import { PaginaProduto } from './pages/pagina-produto/pagina-produto';
import { Register } from './component/register/register';
import { ForgotPassword } from './component/forgot-password/forgot-password';
import { User } from './pages/user/user';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'camisetas', component:Camisetas},
    {path:'calcas', component:Calcas},
    {path:'shorts', component:Shorts},
    {path:'conjuntos', component:Conjuntos},
    {path:'acessorios', component:Acessorios},
    {path: 'login', component:Login},
    {path: 'register', component:Register},
    {path: 'forgot-password', component:ForgotPassword},
    {path: 'perfil', component:User},
    {path: 'admin', component:Admin, canActivate: [adminGuard]},
    {path: 'produto/:id', component: PaginaProduto}
];