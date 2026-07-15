import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PainelComponent } from './components/painel/painel.component';
import { loginGuard } from './guard/login.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component: MainComponent
    },
    {
        path:'panel',
        component: PainelComponent,
        canActivate: [loginGuard]
    },
];
