import { Component, Input, OnInit } from '@angular/core';
import { Router }    from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { map} from 'rxjs/operators'
import {AuthGuard} from '../../../auth-guard.service'
import {User} from './user.model'

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;
  chave: string;
  users: User;


  //userMenu = [{ title: 'Profile' }, { title: 'Sair' }];
  userMenu = [{ title: 'Sair' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private router: Router,
              private guard: AuthGuard,
              private http: HttpClient) {
  }

  ngOnInit() {
    
    this.chave = this.guard.getChave();
    console.log(this.chave);
    this.http.get('http://131.221.243.115:14002/user/me',{ headers: {'x-access-token': this.chave} })
    .subscribe((data : User) => {
        this.users = data;
    })
    console.log(this.users); 

    this.menuService.onItemClick().pipe(
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
               
        if(title == 'Sair'){
          localStorage.clear()
          this.router.navigate(['auth/login'])
          window.location.reload();
        };
      });
 

    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
