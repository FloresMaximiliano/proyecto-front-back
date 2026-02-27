import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { App as AppComponent } from "./pages/app/app";

@Component({
  selector: 'app-root',
  imports: [AppComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto-frontEnd');
}
