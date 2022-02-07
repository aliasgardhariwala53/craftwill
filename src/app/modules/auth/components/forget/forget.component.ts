import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { valueChanges } from 'src/app/helper/formerror.helper';
import { AuthservicesService } from 'src/app/services/authservices.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})


export class ForgetComponent implements OnInit {

  constructor(private _authServ :AuthservicesService, private _fb :FormBuilder,private spinner:NgxUiLoaderService,private toastr: ToastrService) { }

  forgotForm :FormGroup;
  message : string;
  error : string;

  createForm(){
    this.forgotForm = this._fb.group({
      email : ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    })

    this.forgotForm.valueChanges.subscribe(() => {
      this.formErrors = valueChanges(this.forgotForm, {...this.formErrors}, this.formErrorMessages);
    });
  }

  formErrors = {
    email: ''
  };

  formErrorMessages = {
    email: {
      required: 'Email is Required',
      pattern: 'Valid email is required'
    }
  };

  forgotPassword(){
    this.spinner.start();
    console.log(this.forgotForm.value);
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      this.formErrors = valueChanges(this.forgotForm, {...this.formErrors}, this.formErrorMessages);
      return;
    }
    console.log(this.forgotForm.value);
    this._authServ.forgotPassword(this.forgotForm.value).subscribe((result)=>{
      this.spinner.stop();
      this.toastr.message(result.message,result.success);
    })
  }

  ngOnInit(): void {
    this.createForm();
  }

}
