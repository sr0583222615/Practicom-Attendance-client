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

  getAllAssesmentsType() :Observable<any[]> {
    let url = 'https://localhost:44392/assessments/getAllAssessment';              
    return this.#http.get<any[]>(url);
  }

  addAssessments(assessments:Assessment[]) :Observable<string> {
    let url = 'https://localhost:44392/assessments/addAssessments';              
    return this.#http.post<string>(url,assessments);
  } 

  getAssessmentByAssessmentType(assessmentType:number,id:number) :Observable<any[]> {
    let url = `https://localhost:44392/assessments/getAssessmentByAssessmentType?id=${id}&assessmentType=${assessmentType}`;            
    return this.#http.get<any[]>(url);
  }

}
