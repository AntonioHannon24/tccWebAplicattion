import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {


  LoginForm!: FormGroup;

  constructor(private authservice: AuthService,
    private route: Router,
  ) { }

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


    (await this.authservice.loginAdmin(formData)).subscribe((e) => {
  
     if(e.message){
        this.route.navigate([''])
     }
    })



  }

  get email() {
    return this.LoginForm.get('email')!;
  }

  get password() {

    return this.LoginForm.get('password')!;
  }


}

