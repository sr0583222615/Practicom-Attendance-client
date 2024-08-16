import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentsComponent } from './components/students/students.component';
import { ProjectsComponent } from './components/projects/projects.component';

export const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'student',component:StudentsComponent},
  {path:'project',component:ProjectsComponent}
];
