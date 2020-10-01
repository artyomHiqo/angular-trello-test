import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app-services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogOut$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.isLogOut$ = this.authService.isAuthorized();
  }
}
