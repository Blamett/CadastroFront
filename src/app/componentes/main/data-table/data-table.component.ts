import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { plainToInstance } from 'class-transformer';
import { User } from '../users/user';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoComponent } from './userInfo/userInfo.component';
import { idData } from './id-interface';

/**
 * @title Table with pagination
 */
@Component({
    selector: 'data-table',
    styleUrls: ['data-table.component.scss'],
    templateUrl: 'data-table.component.html',
})
export class TablePaginationExample implements OnInit {
    displayedColumns: string[] = ['nome', 'sexo', 'dataDeNascimento', 'estadoCivil', 'enderecos'];
    dataSource = new MatTableDataSource<User>();

    users: User[] = [];

    constructor(
        private http: HttpClient,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.getAllUsers();
    }

    async getAllUsers() {
        this.http.get<User[]>('http://192.168.90.58:3000/user')
            .subscribe(response => {
                this.users = plainToInstance(User, response);
                this.dataSource.data = this.users;
            });
    }

    expandirUsuario(_id: string) {
        let currentUser = _id;
        const dialogRef = this.dialog.open(UserInfoComponent, {
            data: { id: currentUser, }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getAllUsers();
        });
    }
}