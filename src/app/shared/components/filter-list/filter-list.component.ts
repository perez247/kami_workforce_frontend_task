import { Component } from '@angular/core';
import { InputFieldComponent } from "../input-field/input-field.component";
import { InputTypesEnum } from '../../../core/enums/InputTypesEnum';
import { distinctUntilChanged, map, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParams } from '../../../core/constants/QueryParams';

@Component({
  selector: 'app-filter-list',
  imports: [InputFieldComponent],
  standalone: true,
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss'
})
export class FilterListComponent {
  inputType = InputTypesEnum;
  queryParams = QueryParams;
  input = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.input = this.route.snapshot.queryParamMap.get(this.queryParams.search) || '';
  }

  inputChanged(searchTerm: string): void {
    timer(300)
      .pipe(
        map(() => searchTerm),
        distinctUntilChanged()
      ).subscribe({
        next: (value) => {
          this.router.navigate([], { queryParams: { ...this.route.snapshot.queryParams, [this.queryParams.search]: value } })
        }
    });
  }
}
