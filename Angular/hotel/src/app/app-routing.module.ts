import { PotentialListComponent } from './components/manage-user/potential-list/potential-list.component';
import { UserInfoComponent } from './components/manage-user/user-info/user-info.component';

import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { RoominfoComponent } from './components/room/roominfo/roominfo.component';

import { NgModule } from '@angular/core';
import { ResolveFn, RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PolicyComponent } from './components/policy/policy.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TestComponent } from './components/test/test.component';
import { Title } from '@angular/platform-browser';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { RoomComponent } from './components/room/room.component';
import { SearchRoomComponent } from './components/room/search/search-room/search-room.component';

const resolvedChildATitle: ResolveFn<string> = () => Promise.resolve('child a');
const routes: Routes = [
{path:'',component:HomeComponent},
{path:'home',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'book',component:BookComponent},
{path:'signup',component:SignupComponent},
{path:'policy',component:PolicyComponent},
{path:'profile',component:ProfileComponent},
{path:'manage-user',component:ManageUserComponent},
{path:'test', component:TestComponent},
{path:'manage-room', component:RoomComponent},
{path:'search-room', component:SearchRoomComponent},
{path:'room-detail/:id', component:RoominfoComponent},
{path:'potential-list', component:PotentialListComponent},
{path:'user-detail/:id', component: UserInfoComponent}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponent  = [PagenotfoundComponent, 
                                  TestComponent,
                                  SearchRoomComponent,
                                  RoomComponent,
                                  ManageUserComponent,
                                  RoominfoComponent]