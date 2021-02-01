import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { DetailRoutingModule } from "./detail-routing.module";

import { DetailComponent } from "./detail.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    DetailRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class DetailModule {}
