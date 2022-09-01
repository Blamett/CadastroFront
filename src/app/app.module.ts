import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from "@angular/common/locales/pt";
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import 'reflect-metadata';
import { routes } from './app-router.module';
import { AppComponent } from './app.component';
import { MainModule } from './componentes/main/main.module';

registerLocaleData(ptBr);
export const CORE_DATE_FORMATS = {
    parse: {
        dateInput: "DD/MM/YYYY",
    },
    display: {
        dateInput: "DD/MM/YYYY",
        monthYearLabel: "YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "YYYY",
    },
};
export const CORE_DATE_LOCALE = "pt-BR";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MainModule,
        HttpClientModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: CORE_DATE_LOCALE },
        { provide: MAT_DATE_FORMATS, useValue: CORE_DATE_FORMATS },
        { provide: LOCALE_ID, useValue: "pt-BR" },
        { provide: DEFAULT_CURRENCY_CODE, useValue: "BRL" },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
