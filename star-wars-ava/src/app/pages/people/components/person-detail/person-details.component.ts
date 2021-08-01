import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PersonModel} from '../../../../shared/models/person.model';
import {AppState} from '../../../../reducers';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-board-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonDetailsComponent implements OnInit {

  person: PersonModel;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { person: PersonModel }) => {
      this.person = data.person;
      // this.board = data.board.id;
      // this.cardForm = new FormGroup({
      //   title: new FormControl(data.card.title)
      // });

    });
  }

}
