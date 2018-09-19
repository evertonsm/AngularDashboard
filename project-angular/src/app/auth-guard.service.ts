import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import { NbAuthService, NbAuthJWTToken, NbAuthResult} from '@nebular/auth';
import { tap } from 'rxjs/operators/tap';
import { tokenKey } from '@angular/core/src/view';


@Injectable()
export class AuthGuard implements CanActivate {
  
  user = {};

  constructor(private authService: NbAuthService, private router: Router) {
    
    this.authService.logout("email").subscribe((result: NbAuthResult) =>{
      console.log(result.isSuccess());
    })
    

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable 
          
        }
    });
  }

  canActivate() {
    
    return this.authService.isAuthenticated().pipe(tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
          console.log("Authenticated: " + authenticated);
        }),
      );
  }

  getChave(): string{
    var chave;
    this.authService.getToken()
      .subscribe((token: NbAuthJWTToken) => {
        chave = token.toString();
    });
    return chave;
  }
}