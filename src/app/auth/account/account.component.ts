import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(private authService: AuthService) {}

  user: User;

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }
}
