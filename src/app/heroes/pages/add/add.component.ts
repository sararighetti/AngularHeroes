import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`img{
    width:100%;
}`

  ]
})
export class AddComponent implements OnInit {

  publisher = [
    {
      id: 'DC Comics',
      description: 'DC - Comics'

    },
    {
      id: 'Marvel Comics',
      description: 'Marvel - Comics'

    },
    
    {
      id: 'Dark Horse',
      description: 'Dark - Horse'

    },

  ];
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters:'',
    first_appearance:'',
    publisher: Publisher.MarvelComics,
    alt_img:''

  }

  constructor( private heroeService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar, 
               public dialog: MatDialog) { }

  ngOnInit(): void {
if(!this.router.url.includes('edit')){
return;
}
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroeService.getHeroePorId(id))
    )
    .subscribe( heroe => this.heroe = heroe); 
  }
save(){
  if(this.heroe.superhero.trim().length === 0 || this.heroe.alt_img ==="" ){
    this.mostrarSnackBar('Superhero name and Photo url are required!')
return;    } 
   
  
if(this.heroe.id){
  //Actualizar Hereo
  this.heroeService.actualizatHeroe(this.heroe)
  .subscribe( heroe => this.mostrarSnackBar('Heroe Updated!'))
} else {
  // crear Heroe
  this.heroeService.addHero(this.heroe)
  .subscribe( heroe =>  {
    this.router.navigate(['/heroes/edit', heroe.id]);
    this.mostrarSnackBar('Heroe Added!')
  })
}
}
borrarHeroe(){
  const dialog= this.dialog.open(ConfirmarComponent, {
     width:'400px',
     data: this.heroe
   });

   dialog.afterClosed().subscribe(
     (result) =>{
       if (result){
        this.heroeService.borrarHeroe(this.heroe.id!)
        .subscribe( resp =>{
          this.router.navigate(['/heroes']);
          this.mostrarSnackBar('Heroe Deleted!')
        }) 
       }
     }
   )
  
 
}
mostrarSnackBar( mensaje:string){
this.snackBar.open( mensaje, 'Ok!', {duration:2500})
}
regresar(){
  this.router.navigate(['/heroes/list']);
}
}
