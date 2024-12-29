import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputFieldComponent } from "../input-field/input-field.component";
import { InputTypesEnum } from '../../../core/enums/InputTypesEnum';
import { distinctUntilChanged, map, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParams } from '../../../core/constants/QueryParams';
import { CleanUpHandler } from '../utils/clean-up-handler.component';

@Component({
  selector: 'app-filter-list',
  imports: [InputFieldComponent],
  standalone: true,
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterListComponent extends CleanUpHandler {
  inputType = InputTypesEnum;
  queryParams = QueryParams;
  input = '';
  currentValue = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    super();
    this.input = this.route.snapshot.queryParamMap.get(this.queryParams.search) || '';
    this.currentValue = this.input;
  }

  inputChanged(searchTerm: string): void {
    if (this.currentValue === searchTerm.trim()) { return; }
    this.subscriptions.push(
      timer(300)
      .pipe(
        map(() => searchTerm),
        distinctUntilChanged(), // Not quite sure why this is not passing the test
      ).subscribe({
        next: (value) => {
          this.currentValue = value.trim();
          this.router.navigate([], { queryParams: { ...this.route.snapshot.queryParams, [this.queryParams.search]: this.currentValue } })
        }
    })
    )
  }
}
