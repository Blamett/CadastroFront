import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '../users/user';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'data-table',
  styleUrls: ['data-table.component.scss'],
  templateUrl: 'data-table.component.html',
})
export class TablePaginationExample implements OnInit {
  displayedColumns: string[] = ['nome', 'sexo', 'dataDeNascimento', 'estadoCivil'];
  dataSource = new MatTableDataSource<User>();

  users: User[] = []

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.http.get<User[]>('http://192.168.90.58:3000/user')
      .subscribe(response => {
        this.users = response;
        this.dataSource.data = this.users
      })
  }
}


/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */