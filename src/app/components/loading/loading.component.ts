import { Component } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-loading',
  template: `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `,
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {}