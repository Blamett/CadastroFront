import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AsFormGroupPipe } from 'src/app/pipes/as-form-group.pipe';
import { routes } from '../../app-router.module';
import { CreateComponent } from './create/create.component';
import { TablePaginationExample } from './data-table/data-table.component';
import { MainComponent } from './main.component';
import { UsersComponent } from './users/users.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { UserInfoComponent } from './data-table/userInfo/userInfo.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    imports: [
        NgxMaskModule.forChild(),
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
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
        MatDividerModule,
        MatExpansionModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSelectModule
    ],
    declarations: [
        MainComponent,
        CreateComponent,
        UsersComponent,
        TablePaginationExample,
        AsFormGroupPipe,
        UserInfoComponent,
    ],
    bootstrap: [MainComponent]
})
export class MainModule { }