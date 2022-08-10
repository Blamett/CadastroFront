import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = []

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.http.get<User[]>('http://192.168.90.58:3000/user')
      .subscribe(response => {
        this.users = response;
        console.log(response)
      })
  }

}
