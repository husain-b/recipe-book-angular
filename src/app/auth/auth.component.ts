import {
  Component,
  ComponentFactoryResolver,
  Output,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { AuthService, AuthResponse } from './auth.service';
import { Router } from '@angular/router';
import { AlerttComponent } from '../shared/alertt/alertt.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.initform();
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  // @Output() username = new EventEmitter<String>();

  closeSub: Subscription;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  loginMode = true;
  loadingMode = false;
  error = null;
  authForm: FormGroup;
  authObs: Observable<AuthResponse>;

  onSwitchMode() {
    this.loginMode = !this.loginMode;
    this.error = null;
  }

  onSubmit() {
    const name = this.authForm.value['name'];
    const email = this.authForm.value['email'];
    const password = this.authForm.value['password'];

    if (this.authForm.valid) {
      if (this.loginMode) {
        this.loadingMode = true;
        this.authObs = this.authService.login(email, password);
      } else {
        this.loadingMode = true;
        this.authObs = this.authService.signUp(name, email, password);
      }

      this.authObs.subscribe(
        (response) => {
          this.dataStorageService.fetchRecipes().subscribe();
          this.router.navigate(['/recipes']);
          this.loadingMode = false;
        },
        (error) => {
          if (!error) {
            this.error = 'Unknown error occured';
          } else {
            this.error = error;
          }

          this.showErrorAlert(error);
          this.loadingMode = false;
        }
      );
      this.error = null;
    } else {
      alert('Please provide valid details');
    }
  }

  private initform() {
    this.authForm = new FormGroup({
      name: new FormControl(null, Validators.minLength(2)),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  showErrorAlert(message) {
    const alertcmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlerttComponent);

    const hostContainerRef = this.alertHost.viewContainerRef;

    hostContainerRef.clear();

    const componentRef = hostContainerRef.createComponent(alertcmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostContainerRef.clear();
    });
  }
}
