import { Component } from '@angular/core';
import { EncryptorComponent } from './components/encryptor/encryptor.component'; 
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  // HttpClientModule,
    EncryptorComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'encryptor-app';
}

