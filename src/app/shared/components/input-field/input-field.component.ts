import { Component, input, model, output } from '@angular/core';
import { LookupModel } from '../../../core/models/lookup.model';
import { InputTypesEnum } from '../../../core/enums/InputTypesEnum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {
  inputType = input.required<InputTypesEnum>()
  maxLength = input(50);
  placeholder = input.required<string>();
  options = input<LookupModel<unknown>[]>()

  itemSelected = output<Event>();
  textInput = model('');
  dropdownInput = model('');

  protected inputTypesEnum = InputTypesEnum;
}
