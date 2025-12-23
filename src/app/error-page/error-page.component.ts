import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [ ToastModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {
  #router = inject(Router);

  goToLogin() {
     this.#router.navigateByUrl('');
  }
}
