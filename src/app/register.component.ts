import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from './auth.service'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form
  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.form = fb.group({
      email: ['', [Validators.required,emailValid()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator:matchingFields('password', 'confirmPassword')})
  }
  ngOnInit() {

  }
  showSpinner:boolean=false;
  credentials={
    'email':'',
   'password':'',
   'confirmpassword':''
  }
   setCredentials(){
    this.credentials.email=this.form.get('email').value;
    this.credentials.password=this.form.get('password').value;
    this.credentials.confirmpassword=this.form.get('confirmPassword').value;
  }
  register() {
    this.setCredentials();
    this.auth.register(this.credentials);
  }
}
function matchingFields(field1, field2){
  return form=>{
    if(form.controls[field1].value!==form.controls[field2].value)
    return {mismatchedFields:true}
  }
}
function emailValid(){
  return control=>{
    var regex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ;return regex.test(control.value)?null:{invalidEmail:true};
  }
}