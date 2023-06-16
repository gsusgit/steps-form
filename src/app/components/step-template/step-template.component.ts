import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { StepModel } from '../../models/step.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { StepsService } from '../../services/steps.service';
import { Router } from '@angular/router';
import { brokers } from '../../stores/brokers.store';
import { insurances } from '../../stores/insurances.store';

@Component({
  selector: 'app-step-template',
  templateUrl: './step-template.component.html',
  styleUrls: ['./step-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StepTemplateComponent implements OnInit {

  @Input() step: StepModel;
  currentIndex: number;
  brokers = brokers;
  insurances = insurances;
  step1Form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastname1: ['', [Validators.required]],
    lastname2: ['']
  });
  step2Form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    phone1: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15), Validators.pattern(this.vs.phonePattern)]],
    phone2: ['', [Validators.minLength(9), Validators.maxLength(15), Validators.pattern(this.vs.phonePattern)]]
  });
  step3Form: FormGroup = this.formBuilder.group({
    company: [''],
    type: ['']
  });
  form1Data: any;
  form2Data: any;
  form3Data: any;

  constructor(private formBuilder: FormBuilder,
              private vs: ValidatorsService,
              private stepsService: StepsService,
              private router: Router) { }

  ngOnInit(): void {
    this.currentIndex = this.step.index;
  }

  get form1() {
    return this.step1Form.controls;
  }

  get form2() {
    return this.step2Form.controls;
  }

  get form3() {
    return this.step3Form.controls;
  }

  onCompleteStep(form: FormGroup) {
    if (form.valid) {
      console.log(form.value)
      switch (this.currentIndex) {
        case 1:
          this.form1Data = form.value;
          break;
        case 2:
          this.form2Data = form.value;
          break;
        case 3:
          this.form3Data = form.value;
      }
      this.step.isComplete = true;
      if (!this.stepsService.isLastStep()) {
        this.stepsService.moveToNextStep();
      } else {
        this.onSubmit();
      }
    }
  }

  onSubmit(): void {
    console.log(this.form1Data, this.form2Data, this.form3Data);
    this.router.navigate(['/complete']);
  }
}
