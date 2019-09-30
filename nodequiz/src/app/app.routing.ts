/*
=====================================
  ; Title: App Routing Component
  ; Author: Tyler Armstrong
  ; Date: 29 Sep 2019
  ; Description: Component for routing.
======================================
*/

import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './shared/guards/auth-guard/auth-guard.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuardService] }
    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'not-found', component: NotFoundComponent }
    ]
  },
  { path: '**', redirectTo: 'session/not-found' }
];
