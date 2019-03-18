import {Component } from '@angular/core'
import { AuthService } from './auth.service'
import { style } from '@angular/animations';
@Component({
    selector:'nav',
    template:`
    <mat-toolbar color="primary">
    <button  mat-button routerLink="/crop">Cropper</button>
    <span style="flex:1 1 auto;"></span>
    <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/register">Register</button>
    <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/login">Login</button>
    <span *ngIf="auth.isAuthenticated">Welcome {{auth.name}}</span>
    <button mat-button *ngIf="auth.isAuthenticated" (click)="auth.logout()">Logout</button>
    </mat-toolbar>
    `,
    styleUrls: ['./nav.component.css']
})
export class NavComponent{
    constructor(public auth: AuthService) {
      
      }
}