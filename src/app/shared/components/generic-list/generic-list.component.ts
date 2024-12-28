import { Component, input, OnInit } from '@angular/core';
import { CleanUpHandler } from '../utils/clean-up-handler.component';
import { IListViewModel } from '../../../core/interfaces/i-listview.model';
import { ActivatedRoute } from '@angular/router';
import { ApplicationRequest } from '../../../core/models/request.model';
import { FilterListComponent } from "../filter-list/filter-list.component";
import { SortListComponent } from "../sort-list/sort-list.component";
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-generic-list',
  imports: [FilterListComponent, SortListComponent, PaginationComponent],
  standalone: true,
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.scss'
})
export class GenericListComponent extends CleanUpHandler implements OnInit {
  vm = input.required<IListViewModel>();

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.getCurrentRoute();
    this.listenForQueryParams();
  }

  getCurrentRoute(): void {
    const {sort, search, pageNumber} = this.route.snapshot.queryParams
    this.filter(sort, search, pageNumber);
  }

  listenForQueryParams() {
    this.subscriptions.push(this.route.queryParams.subscribe({
      next: ({sort, search, pageNumber}) => {
        this.filter(sort, search, pageNumber);
      } 
    }))
  }

  //TODO: the use of any should be fixed here
  filter(sort: any, search: string, pageNumber: number) {
    this.vm().filter.set(new ApplicationRequest(search, sort, { pageNumber, pageSize: 10 }))
  }
}
