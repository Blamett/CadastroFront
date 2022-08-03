import { Route } from "@angular/router";
import { MainComponent } from "./componentes/main/main.component";

export const routes: Route[] = [

    { path: "", component: MainComponent },
    { path: "**", redirectTo: "login" },
];