import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalListComponent } from './medical-list/medical-list.component';
import { AddMedicalComponent } from './add-medical/add-medical.component';
import { ViewMedicalComponent } from './view-medical/view-medical.component';
import { SparePartComponent } from './spare-part/spare-part.component';
import { AddSparePartComponent } from './add-spare-part/add-spare-part.component';
import { PollutionListComponent } from './pollution-list/pollution-list.component';
import { AddPollutionComponent } from './add-pollution/add-pollution.component';

const routes: Routes = [
  {path:"", component: MedicalListComponent},
  {path:"add", component: AddMedicalComponent},
  {path:"edit", component: AddMedicalComponent},
  {path:"view", component: ViewMedicalComponent},
  {path:"spare-parts", component: SparePartComponent},
  {path:"spare-parts/add", component: AddSparePartComponent},
  {path:"spare-parts/edit", component: AddSparePartComponent},
  {path:"pollution", component: PollutionListComponent},
  {path:"pollution/add", component: AddPollutionComponent},
  {path:"pollution/edit", component: AddPollutionComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalRoutingModule { }
