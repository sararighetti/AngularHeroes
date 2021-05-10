import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`

  img{
    width:70%;
    border-radius:5px
  }
  `,
  `
  button {
    background-color: grey;
    color: black;
  }
  `
  ,
  `
  #div1 {
    margin-left: 50px
  }
  `
  ]
})
export class HeroeComponent implements OnInit {

 heroe!: Heroe;

  constructor(private activateRoute: ActivatedRoute,
              private heroeService: HeroesService,
              private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params
    .pipe(
      switchMap(({id}) => this.heroeService.getHeroePorId(id))
    )
    .subscribe( heroe => this.heroe = heroe);
  }
regresar(){
  this.router.navigate(['/heroes/list']);
}
}
