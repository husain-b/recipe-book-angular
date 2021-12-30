import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'appDropdown',
})
export class DropdownDirective {
  @HostBinding('data-toggle.dropdown') isOpen = false;
  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }
}
