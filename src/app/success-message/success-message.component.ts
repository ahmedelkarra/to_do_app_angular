import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [],
  templateUrl: './success-message.component.html',
})
export class SuccessMessageComponent {
  @Input() successMessage?: string;
}
