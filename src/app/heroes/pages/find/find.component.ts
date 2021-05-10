import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styles: [
  ]
})
export class FindComponent implements OnInit {

  termino: string= "";
  heroes: Heroe []= [];
  hereoSeleccionado: Heroe | undefined;
  constructor(private HeroesService: HeroesService) { }

  ngOnInit(): void {
  }
buscando(){
this.HeroesService.getSugerencias(this.termino.trim()).subscribe(heroes => this.heroes = heroes);
}
opcionSeleccionada(event: MatAutocompleteSelectedEvent){
  if(!event.option.value){
    this.hereoSeleccionado = undefined; 
    return}
const heroe: Heroe = event.option.value;
this.termino = heroe.superhero;
this.HeroesService.getHeroePorId(heroe.id!)
.subscribe(heroe => this.hereoSeleccionado = heroe);
}
}
