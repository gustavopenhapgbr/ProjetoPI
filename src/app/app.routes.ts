import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ForgotPassword } from './pages/forgot-password/forgot-password';

export const routes: Routes = [
    { path: '', component: Home, title:'F.Company' },
    { path: 'login', component: Login, title:'Login' },
    { path: 'register', component: Register, title:'Criar conta' },
    { path: 'forgot-password', component: ForgotPassword, title:'Esqueci a senha' },
];