import { Component, input } from '@angular/core';
import { InputTypesEnum } from '../../../core/enums/InputTypesEnum';
import { Router, ActivatedRoute } from '@angular/router';
import { QueryParams } from '../../../core/constants/QueryParams';
import { LookupModel } from '../../../core/models/lookup.model';
import { InputFieldComponent } from "../input-field/input-field.component";

@Component({
  selector: 'app-sort-list',
  imports: [InputFieldComponent],
  templateUrl: './sort-list.component.html',
  styleUrl: './sort-list.component.scss'
})
export class SortListComponent {
  inputType = InputTypesEnum;
  queryParams = QueryParams;
  selectedItem = '';

  options = input.required<LookupModel<string>[]>();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.selectedItem = this.route.snapshot.queryParamMap.get(this.queryParams.sort) || '';
  }

  inputSelected(selectedItem: string): void {
    if (selectedItem) {
      this.router.navigate([], { queryParams: { ...this.route.snapshot.queryParams, [this.queryParams.sort]: selectedItem } })
    }
  }
}
