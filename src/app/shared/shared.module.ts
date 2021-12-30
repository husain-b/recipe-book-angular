import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { NavbarActiveDirective } from './navbar-active.directive';
import { AlerttComponent } from './alertt/alertt.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DropdownDirective,
    NavbarActiveDirective,
    LoadingSpinnerComponent,
    AlerttComponent,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    DropdownDirective,
    NavbarActiveDirective,
    LoadingSpinnerComponent,
    AlerttComponent,
    PlaceholderDirective,
  ],
  entryComponents: [AlerttComponent],
})
export class SharedModule {}
