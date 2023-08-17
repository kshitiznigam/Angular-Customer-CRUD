import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/app.service';
@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {
  // The FormGroup to hold the form controls
  formGroup!: FormGroup;
  token: string | null = '';

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService) { 
      this.token = localStorage.getItem('access_token');
    }

  ngOnInit() {
    // Initialize the form with form controls and validators
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      lastOrderDate: ['']
    });
  }

  // Function to handle form submission
  onSubmit() {
    if (this.formGroup.valid) {
      // Handle the form data here (e.g., send it to the API using the ApiService)
      this.apiService.submitFormData(this.formGroup.value, this.token).subscribe(
        (response) => {
          console.log('Form submission successful!', response);
          // Reset the form after successful submission
          this.formGroup.reset();
        },
        (error) => {
          console.error('Form submission failed!', error);
          // Handle any errors, such as showing an error message to the user
        }
      );
    }
  }
}
