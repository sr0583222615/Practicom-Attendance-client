import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Assessment } from '../models/assessment.model';

@Injectable({
  providedIn: 'root'
})
export class AssesmentsService {
  private reloadassesmentsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadguide$: Observable<boolean> = this.reloadassesmentsSubject.asObservable();
  #http=inject(HttpClient); 

<<<<<<< HEAD
  getAllAssesmentsType() :Observable<any[]> {
    let url = 'https://localhost:44392/assessments/getAllAssessment';              
=======
  getAllAssesments() :Observable<any[]> {
    debugger
    let url = 'https://localhost:44392/assessments/getAllAssessments';              
>>>>>>> 0da8e133da933396c106ecd79fd09817605b65f8
    return this.#http.get<any[]>(url);
  }

  addAssessments(assessments:Assessment[]) :Observable<string> {
<<<<<<< HEAD
    let url = 'https://localhost:44392/assessments/addAssessments';              
=======
    debugger
    let url = 'https://localhost:44392/assessments/addAssessments';   
>>>>>>> 0da8e133da933396c106ecd79fd09817605b65f8
    return this.#http.post<string>(url,assessments);
  } 

  getAssessmentByAssessmentType(assessmentType:number,id:number) :Observable<any[]> {
    let url = `https://localhost:44392/assessments/getAssessmentByAssessmentType?id=${id}&assessmentType=${assessmentType}`;            
    return this.#http.get<any[]>(url);
  }

}
