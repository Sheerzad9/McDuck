import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  myForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(){}

  initForm() {
    this.myForm = new FormGroup({
      cryptoCurrency: new FormControl('', [Validators.required]),
      toCurrency: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required])
    })
  }
}
