import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  {MatButtonModule,
  MatInputModule, 
  MatCardModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {NavComponent} from './nav.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MyCropperComponent } from './mycropper.component';
import { AngularCropperjsModule } from 'angular-cropperjs'; 
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
const routes=[
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'crop', component:MyCropperComponent}
]
@NgModule({
  declarations: [
    AppComponent,NavComponent,RegisterComponent,LoginComponent, MyCropperComponent
  ],
  imports: [
   Ng4LoadingSpinnerModule.forRoot(),
    AngularCropperjsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatInputModule, 
    MatCardModule, 
    MatButtonModule,
  MatListModule,
  BrowserAnimationsModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  AngularFontAwesomeModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
