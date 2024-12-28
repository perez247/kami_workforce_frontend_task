import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { Pagination } from '../../../core/models/pagination.model';
import { Router, ActivatedRoute } from '@angular/router';
import { QueryParams } from '../../../core/constants/QueryParams';

@Component({
  selector: 'app-pagination',
  imports: [],
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Output() pageChange = new EventEmitter<Pagination>();

  totalItems = input.required<number>();
  pageSize = 10;
  pageNumber = input.required<number>();
  queryParams = QueryParams;

  totalPages = computed(() => 
      Math.ceil(this.totalItems() / this.pageSize)
  );

  constructor(private router: Router, private route: ActivatedRoute) {}

  visiblePages = computed(() => {
      const total = this.totalPages();
      const current = this.pageNumber();
      const maxVisible = 5;
      
      let start = Math.max(2, current - Math.floor(maxVisible / 2));
      const end = Math.min(total - 1, start + maxVisible - 1);
      
      if (end - start < maxVisible - 1) {
          start = Math.max(2, end - maxVisible + 1);
      }
      
      return Array.from(
          { length: end - start + 1 }, 
          (_, i) => start + i
      );
  });

  showLeftEllipsis = computed(() => 
      this.visiblePages().length > 0 && 
      this.visiblePages()[0] > 2
  );

  showRightEllipsis = computed(() => 
      this.visiblePages().length > 0 && 
      this.visiblePages()[this.visiblePages().length - 1] < this.totalPages() - 1
  );

  onPageChange(page: number) {
      if (page >= 1 && page <= this.totalPages()) {
          this.router.navigate([], { queryParams: { ...this.route.snapshot.queryParams, [this.queryParams.pageNumber]: page } })
      }
  }
}