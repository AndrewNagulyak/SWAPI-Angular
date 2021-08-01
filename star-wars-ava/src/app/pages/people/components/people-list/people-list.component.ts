import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {PeopleService} from '../../../../core/services/people.service';
import {Subscription} from 'rxjs';
import {FilterModel} from '../../../../shared/models/filter.model';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent implements OnInit, OnDestroy {
  //
  @Input() filterData: FilterModel;

  public gridView: GridDataResult;
  public pageSize = 10;
  public page = 1;
  public subscription: Subscription;

  constructor(private peopleService: PeopleService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscription = this.peopleService.getAllPeopleByPage(this.pageSize).subscribe((people) => {
      this.page = people.page;
      this.gridView = {
        data: people.results,
        total: people.count
      };
      this.cd.detectChanges();
    });
  }

  public pageChange(event: PageChangeEvent): void {
    this.page = (event.skip + event.take) / this.pageSize;
    this.loadItems();
  }

  private loadItems(): void {
    this.peopleService.changePage(this.page);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
