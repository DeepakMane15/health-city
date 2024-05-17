import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalListComponent } from './medical-list/medical-list.component';
import { AddMedicalComponent } from './add-medical/add-medical.component';
import { ViewMedicalComponent } from './view-medical/view-medical.component';

const routes: Routes = [
  {path:"", component: MedicalListComponent},
  {path:"add", component: AddMedicalComponent},
  {path:"edit", component: AddMedicalComponent},
  {path:"view", component: ViewMedicalComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalRoutingModule { }
