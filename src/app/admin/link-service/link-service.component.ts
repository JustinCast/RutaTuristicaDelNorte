import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Services } from 'src/app/services/services.service';

@Component({
  selector: 'app-link-service',
  templateUrl: './link-service.component.html',
  styleUrls: ['./link-service.component.scss']
})
export class LinkServiceComponent implements OnInit {
  serviceCtrl = new FormControl();
  filteredServices: Observable<any[]>;
  servicesNames: Array<any>;
  @Output() selectedServiceToLink = new EventEmitter();
  constructor(private _service: Services) { }

  ngOnInit() {
    this.getServiceNames();
  }

  configFormControl() {
    this.filteredServices = this.serviceCtrl.valueChanges.pipe(
      startWith(""),
      map(value => this._filterTours(value))
    );
  }

  private _filterTours(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.servicesNames.filter(service =>
      service.name.toLowerCase().includes(filterValue)
    );
  }

  getServiceNames() {
    this._service.getServicesNames().subscribe({
      next: data => {
        this.servicesNames = data;
        this.configFormControl();
      },
      error: err => this._service.handleError(err),
    });
  }

  linkRelated() {
    let newRelated = this.servicesNames.find(
      s => s.name === this.serviceCtrl.value
    );
    newRelated ? (this.selectedServiceToLink.emit(newRelated)) : null;
  }

}
