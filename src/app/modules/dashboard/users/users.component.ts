import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  search = '';
  users = [];
  user = {};
  timeoutId: any;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    localStorage.removeItem('users');
    this.httpService.getRequest('USER_PATH', '0.8/?results=20').subscribe(
      (response) => {
        response.results.forEach(user => {
          let data = {
            "firstname": user.user.name.first,
            "lastname": user.user.name.last,
            "title": user.user.name.title,
            "dob": user.user.dob,
            "phone": user.user.cell,
            "gender": user.user.gender,
            "username": user.user.username
          };
          this.users.push(data);
        });
        localStorage.setItem('users', JSON.stringify(this.users));
      },
      (error) => {
        alert('something went wong')
      }
    );
  }

  userAdd() {
    let userLocalstorageList = JSON.parse(localStorage.getItem('users'));
    userLocalstorageList.push({
      "firstname": "John",
      "lastname": "Doe",
      "title": "Mr",
      "dob": "20/11/2010",
      "phone": "87654321",
      "gender": "Male",
      "username": "john7"
    });
    this.users = userLocalstorageList;
    localStorage.setItem('users', JSON.stringify(userLocalstorageList));
  }

  searchUser() {
    if (this.timeoutId) window.clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(() => {
      if (this.search) {
        this.filterUsers();
      } else {
        let userLocalstorageList = JSON.parse(localStorage.getItem('users'));
        this.users = userLocalstorageList;
      }
    }, 500);
  }
  
  filterUsers() {
    let userLocalstorageList = JSON.parse(localStorage.getItem('users'));
    const result = userLocalstorageList.filter(user => user.username === this.search);
    this.users = result;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
