import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalListComponent } from './medical-list/medical-list.component';
import { AddMedicalComponent } from './add-medical/add-medical.component';
import { ViewMedicalComponent } from './view-medical/view-medical.component';
import { SparePartComponent } from './spare-part/spare-part.component';

const routes: Routes = [
  {path:"", component: MedicalListComponent},
  {path:"add", component: AddMedicalComponent},
  {path:"edit", component: AddMedicalComponent},
  {path:"view", component: ViewMedicalComponent},
  {path:"spare-parts", component: SparePartComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalRoutingModule { }
