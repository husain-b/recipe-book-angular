import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AccountComponent } from './account/account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthComponent, AccountComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RouterModule],
  exports: [AuthComponent, AccountComponent],
})
export class AuthModule {}
