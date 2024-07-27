import { Component, OnInit } from '@angular/core';
import { PortsService } from './services/ports.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ports',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.css']
})
export class PortsComponent implements OnInit {
  ports: any[] = [];
  currentPort: any = null; // for storing the port to be edited
  isEditing: boolean = false; // flag to indicate if we are in edit mode
  constructor(private portsService: PortsService, private router: Router) { }

  ngOnInit(): void {
    this.loadPorts();
  }

  loadPorts(): void {
    this.portsService.getPorts().subscribe(
      (data: any[]) => {
        this.ports = data;
      },
      (error: any) => {
        console.error('Error loading ports', error);
      }
    );
  }

  edit(port: any): void {
    this.currentPort = { ...port }; // create a copy of the port
    this.isEditing = true;
  }

  delete(id: number): void {
    this.portsService.deletePort(id).subscribe(
      (response: any) => {
        console.log('Port deleted:', response);
        this.loadPorts();
      },
      (error: any) => {
        console.error('Error deleting port', error);
      }
    );
  }

  add(): void {
    this.currentPort = {
      id: null,
      lib: ''
    };
    this.isEditing = true;
  };

  save(): void {
    if (this.currentPort.id) {
      this.portsService.updatePort(this.currentPort).subscribe(
        (response: any) => {
          console.log('Port updated:', response);
          this.loadPorts();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error updating port', error);
        }
      );
    } else {
      this.portsService.createPort(this.currentPort).subscribe(
        (response: any) => {
          console.log('Port created:', response);
          this.loadPorts();
        },
        (error: any) => {
          console.error('Error creating port', error);
        }
      );
    }
    this.isEditing = false;
  }

  cancel(): void {
    this.isEditing = false;
    this.currentPort = null;
  }



}
