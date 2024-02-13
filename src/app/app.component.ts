import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Insert Person';
  firstName: string = '';
  lastName: string = '';
  insertForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.insertForm = this.fb.group(
      {}
    );
  }
}
