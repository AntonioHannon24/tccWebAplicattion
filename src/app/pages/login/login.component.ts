import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  LoginForm!: FormGroup;
  @ViewChild('myModal') myModal:any;

  modalRef!:BsModalRef<any>;

  constructor(private authservice: AuthService,
    private route: Router,
    private location: Location,
    private modalService: BsModalService,
    ) { }

  ngOnInit(): void {


    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  async submitLogin() {
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

     this.authservice.startTimer();
    })



  }
  fecharModal(): void {
    this.modalRef.hide();
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

  teste(){
    this.modalRef = this.modalService.show(this.myModal,{class:'modal-lg'})
  }


}
