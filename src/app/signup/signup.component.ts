import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  id: any;
  name: string = '';
  email_Id: string = '';
  empId !: number 
  phno !: number 
  department: string = '';
  type: string = '';
  password: string = '';
  formBuilder: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      empId: ['', Validators.required],
      number: ['', Validators.required],
      department: ['', Validators.required],
      type: ['', Validators.required],
      password: ['']
    });
  }
  
  }


