import { Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';  // Import the RegisterComponent
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { CreateEventComponent } from './create-event/create-event.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },  // Home route
  { path: 'events', component: EventListComponent },  // Events list route
  { path: 'event-details/:id', component: EventDetailsComponent },  // Event details route
  { path: 'register', component: RegisterComponent },  // Register route
  { path: 'login', component: LoginComponent }, 
  { path: 'profile', component: ProfileComponent },
{ path: 'profile/edit', component: ProfileComponent },
{ path: 'my-events', component: MyEventsComponent },
{ path: 'create-event', component: CreateEventComponent },   
{ path: 'edit-event/:id', component: MyEventsComponent },
{ path: 'create-event', component: CreateEventComponent },
{ path: 'profile', component: ProfileComponent }

];
