import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Router} from '@angular/router'

@Injectable()
export class AuthService {
    rootUrl = "https://27s9.azurewebsites.net";
    NAME_KEY = 'name';
    TOKEN_KEY = 'token';
    spinner;
    constructor(private http: HttpClient, private router:Router,  private spinnerService: Ng4LoadingSpinnerService) {    
    }
    get name() {
        return localStorage.getItem(this.NAME_KEY);
    }
    get isAuthenticated(){
        return !!localStorage.getItem(this.TOKEN_KEY);
    }
    register(credentials) {
        this.spinnerService.show();
        console.log(credentials);
        return this.http.post<any>("https://27s9.azurewebsites.net/api/Account/Register", credentials).subscribe(result => {
            this.userAuthentication(credentials.email, credentials.password).subscribe(res => {
                this.authenticate(res);
                this.spinnerService.hide();
            },
                error => {
                    this.spinnerService.hide();
                    console.log(error);
                }
            );
        },
            error => {
                this.spinnerService.hide(); 
                console.log(error);
            });
    }
    userAuthentication(userName, password) {
        var data = "username=" + userName + "&password=" + password + "&grant_type=password";
        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
        return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
    }
    authenticate(res) {
        var authresponse = res;
        if (!authresponse.access_token)
            return;
        localStorage.setItem(this.TOKEN_KEY, authresponse.access_token);
        localStorage.setItem(this.NAME_KEY, authresponse.userName);
        this.router.navigate(['/']);
    }
    logout()
    {
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
    }
    login(userName, password)
    {
        this.spinnerService.show();
        this.userAuthentication(userName, password).subscribe(res => {
            this.authenticate(res);
            this.spinnerService.hide();
        },
            error => {
                console.log(error);
                this.spinnerService.hide();
            }
        );
    }
}