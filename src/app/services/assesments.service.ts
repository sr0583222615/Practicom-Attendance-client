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

  getAllAssesments() :Observable<any[]> {
    debugger
    let url = 'https://localhost:44392/assessments/getAllAssessments';              
    return this.#http.get<any[]>(url);
  }

  addAssessments(assessments:Assessment[]) :Observable<string> {
    debugger
    let url = 'https://localhost:44392/assessments/addAssessments';   
    return this.#http.post<string>(url,assessments);
  } 

  getAssessmentTypeByStudent(assessmentType:number,id:number) :Observable<any[]> {
    debugger
    let url = `https://localhost:44392/assessments/getAssessmentTypeByStudent?id=${id}&assessmentType=${assessmentType}`;            
    return this.#http.get<any[]>(url);
  }
  setReloadguide(){
    let flag = this.reloadassesmentsSubject.value;
    this.reloadassesmentsSubject.next(!flag);
  }
}
