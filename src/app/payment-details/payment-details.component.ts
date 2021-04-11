import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import {PaymentDetail} from '../shared/payment-detail.model';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service:PaymentDetailService,
    private toastr:ToastrService) {
      
    }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectRecord:PaymentDetail){
    this.service.formData= Object.assign({},selectRecord);
  }

  onDelete(id:number){
    if(confirm('Are you Sure to delete this record?')){
    this.service.deletePaymentDetail(id)
    .subscribe(
      res=>{
        this.service.refreshList();
        this.toastr.error("Deleted Sucessfully",'Payment Detail Register')
      },
      err=>{console.log(err)}
      
    )
    }
  }

}
