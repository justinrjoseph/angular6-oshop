import { UserService } from 'shared/_services/user.service';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'shared/_services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._auth.user$.subscribe((user) => {
      if ( !user ) return;

      this._userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      if ( !returnUrl ) return;

      localStorage.removeItem('returnUrl');
      this._router.navigateByUrl(returnUrl);
    });
  }
}
