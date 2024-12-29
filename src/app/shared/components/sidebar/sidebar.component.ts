import { ChangeDetectionStrategy, Component, inject, OnInit, output, signal } from '@angular/core';
import { ngxRoutes } from '../../../app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CleanUpHandler } from '../utils/clean-up-handler.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent extends CleanUpHandler implements OnInit {
  routes = ngxRoutes;
  private breakpointObserver = inject(BreakpointObserver);

  isOpen = signal<boolean>(false);
  toggleSideBar = output<boolean>();

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        if (result.matches) {
          this.isOpen.set(false);
          this.toggleSideBar.emit(false);
        } else {
          this.isOpen.set(true);
          this.toggleSideBar.emit(true);
        }
      })
    );
  }

  closeOnOverlayOrSmallScreens() {
    if (this.breakpointObserver.isMatched([Breakpoints.Small, Breakpoints.XSmall])) {
      this.isOpen.set(false);
      this.toggleSideBar.emit(false);
    }
  }

  toggle(): void {
    this.isOpen.update(x => !x);
    this.toggleSideBar.emit(this.isOpen());
  }
}
