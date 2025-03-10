import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guards';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'heroes',
    loadChildren:()=>import('./heroes/heroes.module').then(m=>m.HeroesModule),
    canMatch:[canMatchGuard],
    canActivate:[canActivateGuard]
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
