import { ChangeDetectionStrategy, Component, Inject, OnInit, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';
import { StudentsComponent } from '../students/students.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, StudentsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  readonly panelOpenState = signal(false);
  #projectsService = inject(ProjectsService)
  #router = inject(Router)
  #route = inject(ActivatedRoute)
  projects: object[] = [];
  projectsNames: string[]=[]
  isOneProject: boolean=false;
  projectName: string="";

  ngOnInit(): void {
    debugger
    this.#route.params.subscribe(id => {
      const guideId = id['guideId'];
      const a = parseInt(guideId);     
      if (!isNaN(a)) {
        this.#projectsService.getAllProjects(guideId).subscribe((response:any) => {
          debugger
          if (response.message.result) {
            this.projectsNames = response.message.result.map((project:any) => {
              debugger
              return `${project.description.trim()}`;
            });
          }
          //ה if לא ממוקם במקום טוב, לכן הוא לא עובד
          if(this.projectsNames.length==1){
            this.#router.navigate(['student', { guideId: guideId }] );
          }
        });
      }
    });
  }
}
