
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PolicyComponent } from './components/policy/policy.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TestComponent } from './components/test/test.component';
import { Title } from '@angular/platform-browser';
const routes: Routes = [
{path:'home',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'book',component:BookComponent},
{path:'signup',component:SignupComponent},
{path:'policy',component:PolicyComponent},
{path:'profile',component:ProfileComponent},
{path:'test', component:TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
