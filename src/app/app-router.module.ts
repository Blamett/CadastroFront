import { Route } from "@angular/router";
import { CreateComponent } from "./componentes/main/create/create.component";
import { MainComponent } from "./componentes/main/main.component";
import { UsersComponent } from "./componentes/main/users/users.component";
import { NotFoundComponent } from "./componentes/not-found/not-found.component";

export const routes: Route[] = [
    { path: "", component: MainComponent,
    children: [
        {
            path: 'cadastro',
            component: CreateComponent,
        },
        {
            path: 'usuarios',
            component: UsersComponent, 
        },
    ]
  },

    { path: "**", component: NotFoundComponent },
];