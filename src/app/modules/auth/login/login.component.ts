import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private httpService: HttpService, private router: Router) { }

  loginUser() {
    if (this.email && this.password) {
      this.httpService.getRequest('AUTH_PATH', 'login-resp.json').subscribe(
        (response) => {
          if ((this.email === response.username) && (this.password === response.password)) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
          } else {
            alert('Enter correct username or password');
          }
        },
        (error) => {
          alert('something went wong')
        }
      );
    } else {
      alert('Enter username and password');
    }
  }

}
