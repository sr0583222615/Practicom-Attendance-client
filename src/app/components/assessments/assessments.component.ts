import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssesmentsService } from '../../services/assesments.service';
import { MatSliderModule } from '@angular/material/slider';
import { Assessment } from '../../models/assessment.model';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { GraphComponent } from '../graph/graph.component';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { lastValueFrom } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-assessments',
  standalone: true,
  imports: [CommonModule, MatSliderModule, FormsModule, DialogModule, GraphComponent, MatButtonModule, DialogComponent],
  templateUrl: './assessments.component.html',
  styleUrl: './assessments.component.css'
})
export class AssessmentsComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  #assesmentService = inject(AssesmentsService);
  #route = inject(ActivatedRoute);
  descriptions: string[] = [];
  months: string[] = [];
  values: string[] = [];
  sliderValues: number[] = [];
  assessmentsList: Assessment[] = []
  AssessmentTypeByStudentList: any[] = []
  colors: string[] = [];
  @Input() id = 0;

  ngOnInit(): void {
    this.#route.params.subscribe(x => {
      this.#assesmentService.getAllAssesmentsType().subscribe((response: any) => {
        if (response.message.result) {
          this.colors = response.message.result.map((c: any) => c.color.trim());
          this.descriptions = response.message.result.map((d: any) => {
            return `${d.description.trim()}`;
          });
        }
      });
    });
  }

  formatLabel(index: number) {
    return (value: number): string => {
      this.sliderValues[index] = value;
      return `${value}`;
    };
  }

  send() {
    for (let i = 0; i < this.sliderValues.length; i++) {
      let assessment: Assessment = new Assessment();
      assessment.assessment_type_id = i + 1;
      assessment.student_id = this.id;
      assessment.value = this.sliderValues[i];
      console.log(assessment);
      this.assessmentsList[i] = assessment;
    }
    this.#assesmentService.addAssessments(this.assessmentsList).subscribe((x: any) => {
      alert(x.message.result)
    });
  }
  async getGraph(month: string[], values: string[], assessmentType: number) {
    try {
      debugger;
      const response: any = await lastValueFrom(this.#assesmentService.getAssessmentByAssessmentType(assessmentType + 1, this.id));
      this.AssessmentTypeByStudentList = response.message.result;
      // this.months = this.AssessmentTypeByStudentList.map(item => {
      //   const date = new Date(item.date);
      //   const toISOStringDate=date.toISOString().split('T')[0];
      //   return date.toISOString().split('T')[0];
      // });
      this.months = this.AssessmentTypeByStudentList.map(item => {
        const date = new Date(item.date);
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        const day = localDate.getDate().toString().padStart(2, '0');
        const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
        const year = localDate.getFullYear();
        return `${day}-${month}-${year}`;
      });
      
      console.log(this.months+"month");
      this.values = this.AssessmentTypeByStudentList.map(item => item.value);
    }
    catch (error) {
      console.error('Error fetching assessment data', error);
    }
    this.openDialog(this.months, this.values, assessmentType);
  }


  openDialog(month: string[], values: string[], i: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: this.descriptions[i],
      month: month,
      values: values
    };
    dialogConfig.minWidth = '90%'
    this.dialog.open(DialogComponent, dialogConfig);
  }

}
