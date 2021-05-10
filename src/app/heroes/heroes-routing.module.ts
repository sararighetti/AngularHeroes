import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AddComponent } from './pages/add/add.component';
import { FindComponent } from './pages/find/find.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { ListComponent } from './pages/list/list.component';
import { HomeComponent } from './pages/home/home.component';


const rutas: Routes =[
  {
    path:'',
     component:HomeComponent, 
    children: [
      {path:'list',component:ListComponent},
      {path:'add',component:AddComponent},
      {path:'edit/:id',component:AddComponent },
      {path:'find',component:FindComponent},
      {path:':id', component:HeroeComponent},
      {path:'**',redirectTo:'list'},
    ]
  }
]


@NgModule({

  imports: [
    
    RouterModule.forChild(rutas)

  ],
  exports:[
  RouterModule
  ]
})
export class HeroesRoutingModule { }
