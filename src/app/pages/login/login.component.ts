import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  LoginForm!: FormGroup;

  constructor(private authservice: AuthService,
    private route: Router,
    private location: Location) { }

  ngOnInit(): void {


    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  async submit() {
    if (this.LoginForm.invalid) {
      return;
    }
    const formData = new FormData();

    formData.append("email", this.LoginForm.get('email')?.value)
    formData.append("password", this.LoginForm.get('password')?.value);


    (await this.authservice.login(formData)).subscribe((e) => {
  
     if(e.message){
        this.route.navigate([''])
     }
    })


//console.log('teste')
  }


  
  voltar() {
    this.location.back()
  }

  get email() {
    return this.LoginForm.get('email')!;
  }

  get password() {

    return this.LoginForm.get('password')!;
  }


}
