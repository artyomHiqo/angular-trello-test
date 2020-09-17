import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$: Observable<any>;

  constructor(private authService: AuthService) {
    this.user$ = authService.user$;
   }

  ngOnInit(): void {
  }

}
