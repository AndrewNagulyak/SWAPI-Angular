import {MovieModel} from './movie.model';
import {PlanetModel} from './planet.model';
import {SpecieModel} from './specie.model';
import {StarshipModel} from './starship.model';


export class PersonModel {
  birth_year: string;
  films: string[];
  filmsModel?: MovieModel[];
  name: string;
  species: string[];
  speciesModels?: SpecieModel[];
  starships: string[];
  starshipsModel?: StarshipModel[];
  url: string;
}
