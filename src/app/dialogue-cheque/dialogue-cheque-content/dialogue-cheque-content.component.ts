import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cheque } from 'src/app/models/cheque';
import { ChequeService } from 'src/app/services/cheque.service';
import * as converter from 'number-to-words';
import { currencyType } from 'src/app/models/currencyType';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dialogue-cheque-content',
  templateUrl: './dialogue-cheque-content.component.html',
  styleUrls: ['./dialogue-cheque-content.component.css']
})
export class DialogueChequeContentComponent implements OnInit, OnDestroy {
  chequeData:Cheque;
  convertAmount: number;
  outputWords=''
  chequeDateFormate = 'YYYMMDD';
  currencySubscription: Subscription = new Subscription;
  constructor(private injector: Injector, private chequeService: ChequeService) { 
    this.chequeData = this.injector.get(MAT_DIALOG_DATA,null);
    this.convertAmount =0;

  }

  ngOnInit(): void {
    this.chequeDateFormate = this.chequeData.chequeDate.toISOString().slice(0,10).replace(/-/g,"");
    this.getChequeAmount()
  }
  public getChequeAmount(){
    const selectedCurrencyType = currencyType[this.chequeData.currencyType];
    this.currencySubscription = this.chequeService.getChequeAmount(selectedCurrencyType).subscribe(data => {
  try{
    if(data[`${selectedCurrencyType}_GBP`]) {
      this.convertAmount = Number(data[`${selectedCurrencyType}_GBP`]) * Number(this.chequeData.currencyAmount) ;
      this.numToWords(this.convertAmount);
    } else {
      this.convertAmount = 0;
      this.numToWords(this.convertAmount);
    }
   
  }
  catch(e) {
    console.error(e);
  }
  
});
    }
    numToWords(convertAmount:Number):void{
      var nums = convertAmount.toString().split('.')
    this.outputWords = converter.toWords(nums[0])
    if (nums.length == 2) {
        var fraction = converter.toWords(nums[1])
        this.outputWords += 'Pounds and' +  nums[1] + " Cents";
    } else {
      this.outputWords +=  ' Pounds';
    }
    }
    ngOnDestroy() {
      this.currencySubscription.unsubscribe()
  } 
}
