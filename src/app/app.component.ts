import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DotStore';

  constructor(private router:Router) { }

  ngOnInit(): void {
  
    this.getHome();
  
  }


  getHome(){
    this.router.navigate(['home']);
  }
}
