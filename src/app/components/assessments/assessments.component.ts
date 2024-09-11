import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssesmentsService } from '../../services/assesments.service';
import { MatSliderModule } from '@angular/material/slider';
import { Assessment } from '../../models/assessment.model';
import { FormsModule } from '@angular/forms';
import { log } from 'console';
import { DialogModule } from 'primeng/dialog';
import { GraphComponent } from '../graph/graph.component';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-assessments',
  standalone: true,
  imports: [CommonModule, MatSliderModule, FormsModule, DialogModule, GraphComponent, MatButtonModule, DialogComponent],
  templateUrl: './assessments.component.html',
  styleUrl: './assessments.component.css'
})
export class AssessmentsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly panelOpenState = signal(false);
  #assesmentService = inject(AssesmentsService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #cdr = inject(ChangeDetectorRef)
  projects: object[] = [];
  descriptions: string[] = [];
  months: Date[] = [];
  monthsOld: Date[] = [];
  valuesOld: string[] = [];
  values: string[] = [];
  sliderValues: number[] = []; // מערך לשמירת הערכים של כל ה-sliders
  assessmentsList: Assessment[] = []
  AssessmentTypeByStudentList: any[] = []
  @Input() id = 0;
  ngOnInit(): void {
    this.#route.params.subscribe(id => {
      if (!isNaN(this.id)) {
        this.#assesmentService.getAllAssesments().subscribe((response: any) => {
          if (response.message.result) {
            this.descriptions = response.message.result.map((d: any) => {
              return `${d.description.trim()}`;
            });
          }
        });
      }
    });

  }

  formatLabel(index: number) {
    return (value: number): string => {
      this.sliderValues[index] = value;
      return `${value}`;
    };
  }
  send() {
    debugger;
    this.assessmentsList = [];
    for (let i = 0; i < this.sliderValues.length; i++) {
      let assessment: Assessment = new Assessment();
      assessment.assessment_type_id = i + 1;
      assessment.student_id = this.id;
      assessment.value = this.sliderValues[i];
      this.assessmentsList[i] = assessment;
    }
    this.#assesmentService.addAssessments(this.assessmentsList).subscribe((x: any) => {
      alert(x.message.result)
    });
  }
  async getGraph(month: Date[], values: string[], assessmentType: number) {
    try {
      const response: any = await lastValueFrom(this.#assesmentService.getAssessmentTypeByStudent(assessmentType + 1, this.id));
      this.AssessmentTypeByStudentList = response.message.result;
      this.months = this.AssessmentTypeByStudentList.map(item => item.date);
      this.values = this.AssessmentTypeByStudentList.map(item => item.value);
    }
    catch (error) {
      console.error('Error fetching assessment data', error);
    }
    this.openDialog(this.months, this.values, assessmentType);
  }


  openDialog(month: Date[], values: string[], i: number): void {
    debugger
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: this.descriptions[i],
      month: month,
      values: values
    };
    // dialogConfig.width = '800px';
    // dialogConfig.height = '800px';
    dialogConfig.minWidth = '90%'
    this.dialog.open(DialogComponent, dialogConfig);
  }

}




// }
      // this.AssessmentTypeByStudentList = this.AssessmentTypeByStudentList.sort((a: string, b: string) => {
      //   return new Date(a).getTime() - new Date(b).getTime();
      // });