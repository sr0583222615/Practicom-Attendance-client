
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';
import { AssessmentsComponent } from '../assessments/assessments.component';
import { SafeScript } from '@angular/platform-browser';
import { log } from 'console';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, AssessmentsComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  readonly panelOpenState = signal(false);
  #studentsService = inject(StudentsService)
  #router = inject(Router)
  #route = inject(ActivatedRoute)
  students: object[] = [];
  names: string[] = []
  studentId:number=0;

  ngOnInit(): void {
    this.#route.params.subscribe(id => {
      const guideId = id['guideId'];
      const a = parseInt(guideId);
      if (!isNaN(a)) {
        this.#studentsService.getAllStudents(guideId).subscribe((response: any) => {
          debugger;
          console.log(response);
          if (response.message.result) {
            this.names = response.message.result.map((student: any) => {
              this.studentId=student.id;
              console.log(this.studentId +"this.studentId")
              return `${student.firstName.trim()} ${student.lastName.trim()}`;
            });
          }
          console.log(this.names);
        });
      }
    });
  }
}

