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
import { PresentationComponent } from './pages/presentation/presentation.component';
import { QuizComponent } from './quiz/quiz.component';
import { CumulativeSummaryComponent } from './pages/cumulative-summary/cumulative-summary.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuardService] }
    ]
  },
  {
    path: 'session',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'not-found', component: NotFoundComponent }
    ]
  },
  {
    path: 'presentations/:id',
    component: AuthLayoutComponent,
    children: [{ path: '', component: PresentationComponent }]
  },
  {
    path: 'quizzes/:id',
    component: AuthLayoutComponent,
    children: [{ path: '', component: QuizComponent }]
  },
  {
    path: 'summary',
    component: AuthLayoutComponent,
    children: [{path: '', component: CumulativeSummaryComponent}]
  },
  { path: '**', redirectTo: 'session/not-found' }
];
