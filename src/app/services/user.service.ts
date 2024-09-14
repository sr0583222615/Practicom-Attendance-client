import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class userService {
  private reloadguideSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadguide$: Observable<boolean> = this.reloadguideSubject.asObservable();
  #http=inject(HttpClient); 

  login(guideID:number) :Observable<any> {
   const url = `https://localhost:44392/assessments/login/${guideID}`;  
    return this.#http.get<any>(url);
  }
}
