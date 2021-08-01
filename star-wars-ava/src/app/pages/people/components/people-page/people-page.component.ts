import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MoviesService} from '../../../../core/services/movies.service';
import {PeopleService} from '../../../../core/services/people.service';
import {Observable} from 'rxjs';
import {SpeciesService} from '../../../../core/services/species.service';
import {FormControl, FormGroup} from '@angular/forms';
import {FilterModel} from '../../../../shared/models/filter.model';
import {MovieModel} from '../../../../shared/models/movie.model';
import {SpecieModel} from '../../../../shared/models/specie.model';

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeoplePageComponent implements OnInit {

  public value: [number, number] = [-400, 400];
  public min = -400;
  public max = 400;
  public largeStep = 10;
  public smallStep = 40;
  people;
  filterForm = new FormGroup({
    selectedSpecie: new FormControl('-1'),
    selectedMovie: new FormControl('-1'),
    selectedDateRange: new FormControl(this.value)
  });
  filterData: FilterModel = {selectedDateRange: [-400, 400], selectedSpecie: '-1', selectedMovie: '-1'};

  constructor(private moviesService: MoviesService, private cd: ChangeDetectorRef,
              private speciesService: SpeciesService, private peopleService: PeopleService) {
  }

  public moviesItems: Observable<MovieModel[]>;
  public speciesItems: Observable<SpecieModel[]>;


  ngOnInit(): void {
    this.peopleService.initPeople();
    this.filterForm.valueChanges.subscribe((data: FilterModel) => {
      console.log(data);
      this.filterData = data;
      this.peopleService.changePeopleFilter(data);
      this.cd.detectChanges();
    });
    this.moviesItems = this.moviesService.getAllMovies();
    this.speciesItems = this.speciesService.getAllSpecies();
  }

}
