import { Component, inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { guideService } from '../../services/guide.service';
import { catchError, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements ErrorStateMatcher {

  #guideService = inject(guideService)
  #router = inject(Router)
  #activatedRoute = inject(ActivatedRoute)

  isErrorState(control: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean {
    throw new Error('Method not implemented.');
  }

  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
  matcher = new ErrorStateMatcher();

  login() {
    if (this.passwordFormControl.valid) {
      let pass = this.passwordFormControl.value as string;
      let passInt = parseInt(pass);
      this.#guideService.login(passInt).pipe(
        catchError((error) => {
          if (error.status === 400) {
            // this.router.navigate(['./register/', {relativeTo: this.activatedRoute}]);
            this.#router.navigateByUrl('');
          }
          return throwError(error);
        })
      ).subscribe((x) => {
        debugger
        if (x.message == "משתמש לא רשום") {
          alert("משתמש לא רשום")
          this.#router.navigateByUrl('');
        } else if (x.message == "משתמש רשום") {
          //this.#router.navigateByUrl('student');
          this.#router.navigate(['project', { guideId: passInt }] );
        }
      });
    }


  }
}


