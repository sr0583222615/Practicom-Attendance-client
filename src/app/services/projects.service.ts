import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private reloadprojectSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadguide$: Observable<boolean> = this.reloadprojectSubject.asObservable();
  #http=inject(HttpClient); 


  getAllProjects(guideID:number) :Observable<any> {
    debugger
    let url = 'https://localhost:44392/assessments/getAllProjects/'+guideID;              
    return this.#http.get<any>(url);
  }

  setReloadguide(){
    let flag = this.reloadprojectSubject.value;
    this.reloadprojectSubject.next(!flag);
  }
}
