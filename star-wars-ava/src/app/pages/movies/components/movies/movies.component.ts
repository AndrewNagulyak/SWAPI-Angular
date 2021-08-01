import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../../../../core/services/movies.service';
import {Observable} from 'rxjs';
import {MovieModel} from '../../../../shared/models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private moviesService: MoviesService) {
  }

  films: Observable<MovieModel[]>;

  ngOnInit(): void {
    this.films = this.moviesService.getAllMovies();
  }

}
