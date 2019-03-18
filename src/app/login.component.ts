import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from './auth.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form
  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.form = fb.group({
      email: ['', [Validators.required,emailValid()]],
      password: ['', Validators.required]
    })
  }
  ngOnInit() {

  }
  showSpinner:boolean=false;
  login() {
     this.auth.login(this.form.get('email').value, this.form.get('password').value);
  }
}
function emailValid(){
    return control=>{
      var regex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ;return regex.test(control.value)?null:{invalidEmail:true};
    }
  }