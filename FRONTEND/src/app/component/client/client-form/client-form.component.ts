import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/model/Client';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  formgroup: FormGroup;

  client: Client = new Client();

  constructor(private formBuilder: FormBuilder, private router: Router, private clientService: ClientService) {

    this.formgroup = this.formBuilder.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      passwordValidation: ['', [Validators.required, Validators.pattern(this.client.password)]]
    });


    this.formgroup.valueChanges.subscribe({
      next: (value) => {
        this.client.lastname = value.name;
        this.client.firstName = value.firstName;
        this.client.address = value.address;
        this.client.zipCode = value.zipCode;
        this.client.city = value.city;
        this.client.country = value.country;
        this.client.phone = value.phone;
        this.client.email = value.email;
        this.client.gender = value.gender
        this.client.login = value.login;
        this.client.password = value.password;
        this.client.passwordValidation = value.passwordValidation;
      }
    })
  }

  ngOnInit(): void {
    const connected = localStorage.getItem("connected");
    if (connected == "false") {
      this.router.navigate([""])
    }
  }

  onSubmit() {
    this.clientService.postClient(this.client).subscribe((data) => {
      this.router.navigate(["/client"]);
    });
  }

  change(event) {
    this.client.gender = event.target.value;
  }

  changeCountry(event) {
    this.client.country = event.target.value;
  }

}
