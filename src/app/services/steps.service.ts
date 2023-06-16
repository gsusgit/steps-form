import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StepModel } from '../models/step.model';

const STEPS = [
  { index: 1, isComplete: false, name: 'Datos personales' },
  { index: 2, isComplete: false, name: '¿Cómo le contactamos?' },
  { index: 3, isComplete: false, name: 'Información sobre su seguro' }
];

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  steps$: BehaviorSubject<StepModel[]> = new BehaviorSubject<StepModel[]>(STEPS);
  currentStep$: BehaviorSubject<StepModel> = new BehaviorSubject<StepModel>(null);

  constructor() {
    this.currentStep$.next(this.steps$.value[0]);
  }

  setCurrentStep(step: StepModel): void {
    this.currentStep$.next(step);
  }

  getCurrentStep(): Observable<StepModel> {
    return this.currentStep$.asObservable();
  }

  getSteps(): Observable<StepModel[]> {
    return this.steps$.asObservable();
  }

  moveToNextStep(): void {
    const index = this.currentStep$.value.index;

    if (index < this.steps$.value.length) {
      this.currentStep$.next(this.steps$.value[index]);
    }
  }

  isLastStep(): boolean {
    return this.currentStep$.value.index === this.steps$.value.length;
  }
}
