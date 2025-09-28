import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventListComponent },
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'create-event', component: CreateEventComponent, canActivate: [AuthGuardService] },
  { path: 'edit-event/:id', component: EventEditComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profile-edit', component: ProfileEditComponent, canActivate: [AuthGuardService] }, // Add this route
];