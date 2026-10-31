import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { User } from './pages/user/user';
import { Catalogo } from './pages/catalogo/catalogo';
import { Produto } from './pages/produto/produto';

export const routes: Routes = [
    { path: '', component: Home, title: 'F.Company' },
    { path: 'login', component: Login, title: 'Login' },
    { path: 'register', component: Register, title: 'Criar conta' },
    { path: 'forgot-password', component: ForgotPassword, title: 'Esqueci a senha' },
    { path: 'perfil', component: User, title: 'Meu perfil' },
    { path: 'camisetas', component: Catalogo, title: 'Camisetas' },
    { path: 'calcas', component: Catalogo, title: 'Calças' },
    { path: 'shorts', component: Catalogo, title: 'Shorts' },
    { path: 'conjuntos', component: Catalogo, title: 'Conjuntos' },
    { path: 'acessorios', component: Catalogo, title: 'Acessórios' },
    { path: 'produto', component: Produto, title: 'Produto'  }
];