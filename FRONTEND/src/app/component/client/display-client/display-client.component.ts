import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/model/Client';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-display-client',
  templateUrl: './display-client.component.html',
  styleUrls: ['./display-client.component.scss']
})
export class DisplayClientComponent implements OnInit {

  public clients: Client[];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'phone', 'address', 'zipcode', 'city', 'country', 'gender', 'action'];
  constructor(private router: Router, private service: ClientService) { }

  ngOnInit(): void {
    const connected = localStorage.getItem("connected");
    if (connected == "false") {
      this.router.navigate([""])
    }
    this.getClients();
  }

  getClients() {
    this.service.getClients().subscribe((data) => {
      this.clients = data;
    });
  }

  delete(id: number) {
    this.service.deleteClient(id).subscribe(() => {
      this.getClients();
    });
  }
}
