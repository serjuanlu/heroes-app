import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { CanActivateGuard, CanMatchGuard } from './auth/guards/auth.guard';
import { publicCanActivateGuard, publicCanMatchGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),
    canMatch:[publicCanMatchGuard],
    canActivate:[publicCanActivateGuard]
  },
  {
    path:'heroes',
    loadChildren:()=>import('./heroes/heroes.module').then(m=>m.HeroesModule),
    canMatch:[CanMatchGuard],
    canActivate:[CanActivateGuard]
  },
  {
    path:'404',
    component:Error404PageComponent
  },
  {
    path:'',
    redirectTo:'heroes',
    pathMatch:'full'
  },
  {
    path:"**",
    redirectTo:'404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
