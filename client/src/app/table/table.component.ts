import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  form!: FormGroup;
  modalRef!: BsModalRef;

  shareholders: any[] = [];
  currentShareholder: any = {id: null, name: '', stocksCount: 0, stocksType: ''};
  modalCallback!: () => void;

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private server: ServerService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.currentShareholder.name, Validators.required],
      stocksCount: [this.currentShareholder.stocksCount, Validators.required],
      stocksType: [this.currentShareholder.stocksType, Validators.required],
    });
    this.getShareholders();
  }

  private updateForm() {
    this.form.setValue({
      name: this.currentShareholder.name,
      stocksCount: this.currentShareholder.stocksCount,
      stocksType: this.currentShareholder.stocksType,
    });
  }

  private getShareholders() {
    this.server.getShareholders().then((response: any) => {
      console.log('Response', response);
      const totalstocksCount = response.reduce((counter: number, shareholder: any) => counter += shareholder.stocksCount, 0);
      this.shareholders = response.map((shareholder: any) => {
        shareholder.stocksRelativeCount = Math.round(shareholder.stocksCount / totalstocksCount * 10000) / 100;

        return shareholder;
      });
    });
  }

  addShareholder(template: any) {
    this.currentShareholder = {id: null, name: '', stocksCount: '', stocksType: ''};
    this.updateForm();
    this.modalCallback = this.createShareholder.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  createShareholder() {
    const newShareholder = {
      name: this.form.get('name')?.value || '',
      stocksCount: this.form.get('stocksCount')?.value || 0,
      stocksType: this.form.get('stocksType')?.value || '',
    };
    this.modalRef.hide();
    this.server.createShareholder(newShareholder).then(() => {
      this.getShareholders();
    });
  }

  editShareholder(index: any, template: any) {
    this.currentShareholder = this.shareholders[index];
    this.updateForm();
    this.modalCallback = this.updateShareholder.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  updateShareholder() {
    const eventData = {
      id: this.currentShareholder.id,
      name: this.form.get('name')?.value || '',
      stocksCount: this.form.get('stocksCount')?.value || 0,
      stocksType: this.form.get('stocksType')?.value || '',
    };
    this.modalRef.hide();
    this.server.updateShareholder(eventData).then(() => {
      this.getShareholders();
    });
  }

  deleteShareholder(index: any) {
    this.server.deleteShareholder(this.shareholders[index]).then(() => {
      this.getShareholders();
    });
  }

  onCancel() {
    this.modalRef.hide();
  }
}