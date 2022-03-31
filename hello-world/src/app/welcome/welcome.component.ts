import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name: string = "";
  saludo:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  saludar() {
    this.saludo = `Hola ${this.name}, mucho gusto!`;
  }

}
