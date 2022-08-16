import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from '../../app-router.module';
import { CreateComponent } from './create/create.component';
import { MainComponent } from './main.component';
import { UsersComponent } from './users/users.component';
import {MatTableModule} from '@angular/material/table';
import { TablePaginationExample } from './data-table/data-table.component';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatTableModule,
    MatDividerModule
  ],
  declarations: [
    MainComponent,
    CreateComponent,
    UsersComponent,
    TablePaginationExample,
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }