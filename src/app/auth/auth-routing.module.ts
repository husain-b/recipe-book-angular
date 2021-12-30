import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AccountComponent } from './account/account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const authRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'auth/account', component: AccountComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
