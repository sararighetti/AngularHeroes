import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
 
})
export class ListComponent implements OnInit {
heroes: Heroe[] = [];

  constructor(private HeroesService: HeroesService) { }

  ngOnInit(): void {

    this.HeroesService.getHeroes().subscribe( heroes => {this.heroes = heroes; });
  }

}
