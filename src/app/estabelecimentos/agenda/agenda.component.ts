import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  selected: Date | null | undefined;

  constructor(){}

  ngOnInit(): void {
    
  }

}
