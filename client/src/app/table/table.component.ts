import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  form!: FormGroup;
  modalRef!: BsModalRef;

  sholders: any[] = [];
  currentSholder: any = {id: null, name: '', stockscount: 0, stockstype: ''};
  modalCallback!: () => void;

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private server: ServerService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.currentSholder.name, Validators.required],
      stockscount: [this.currentSholder.stockscount, Validators.required],
      stockstype: [this.currentSholder.stockstype, Validators.required],
    });
    this.getSholders();
  }

  private updateForm() {
    this.form.setValue({
      name: this.currentSholder.name,
      stockscount: this.currentSholder.stockscount,
      stockstype: this.currentSholder.stockstype,
    });
  }

  private getSholders() {
    this.server.getSholders().then((response: any) => {
      console.log('Response', response);
      this.sholders = response.map((sholder: any) => {
        sholder.body = sholder.stockscount;
        sholder.header = sholder.name;
        sholder.icon = 'fa-clock-o';
        return sholder;
      });
    });
  }

  addSholder(template: any) {
    this.currentSholder = {id: null, name: '', stockscount: '', stockstype: ''};
    this.updateForm();
    this.modalCallback = this.createSholder.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  createSholder() {
    const newSholder = {
      name: this.form.get('name')?.value || '',
      stockscount: this.form.get('stockscount')?.value || 0,
      stockstype: this.form.get('stockstype')?.value || '',
    };
    this.modalRef.hide();
    this.server.createSholder(newSholder).then(() => {
      this.getSholders();
    });
  }

  editSholder(index: any, template: any) {
    this.currentSholder = this.sholders[index];
    this.updateForm();
    this.modalCallback = this.updateSholder.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  updateSholder() {
    const eventData = {
      id: this.currentSholder.id,
      name: this.form.get('name')?.value || '',
      stockscount: this.form.get('stockscount')?.value || 0,
      stockstype: this.form.get('stockstype')?.value || '',
    };
    this.modalRef.hide();
    this.server.updateSholder(eventData).then(() => {
      this.getSholders();
    });
  }

  deleteSholder(index: any) {
    this.server.deleteSholder(this.sholders[index]).then(() => {
      this.getSholders();
    });
  }

  onCancel() {
    this.modalRef.hide();
  }
}