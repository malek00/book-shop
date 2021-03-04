import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { authRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./Components/auth.component";

@NgModule(
    {
        declarations:[AuthComponent],
        imports: [FormsModule, RouterModule,authRoutingModule,SharedModule],
        exports:[
            AuthComponent
        ]
    }
)
export class AuthModule{}