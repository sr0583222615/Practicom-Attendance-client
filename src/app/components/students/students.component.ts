
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssessmentsComponent } from '../assessments/assessments.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, AssessmentsComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  #studentsService = inject(StudentsService)
  #route = inject(ActivatedRoute)
  students: object[] = [];
  names: string[] = []
  studentId:number=0;

  ngOnInit(): void {
    this.#route.params.subscribe(id => {
      const guideId = id['guideId'];
      const guideIdInt = parseInt(guideId);
      if (!isNaN(guideIdInt)) {
        this.#studentsService.getAllStudents(guideId).subscribe((response: any) => {
          if (response.message.result) {
            this.names = response.message.result.map((student: any) => {
              this.studentId=student.id;
              return `${student.firstName.trim()} ${student.lastName.trim()}`;
            });
          }
        });
      }
    });
  }
}

