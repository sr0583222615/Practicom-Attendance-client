import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private reloadstudentSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadstudent$: Observable<boolean> = this.reloadstudentSubject.asObservable();
  #http=inject(HttpClient); 

  getAllStudents(guideID:number) :Observable<Student[]> {
    debugger
    let url = 'https://localhost:44392/assessments/getAllStudent/'+guideID;              
    return this.#http.get<Student[]>(url);   
  }

  setReloadstudent(){
    let flag = this.reloadstudentSubject.value;
    this.reloadstudentSubject.next(!flag);
  }

}
