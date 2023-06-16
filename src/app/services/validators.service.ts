import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z-A-Z]{2,4}$';
  namePattern = '^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+';
  phonePattern = '^[0-9]{9,15}';

  constructor() { }
}
