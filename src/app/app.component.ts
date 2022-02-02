import { Component } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogueChequeContentComponent } from './dialogue-cheque/dialogue-cheque-content/dialogue-cheque-content.component';
import { Cheque } from './models/cheque';
import { currencyType } from './models/currencyType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  contactForm: FormGroup = new FormGroup({
  });
  title = 'app-material2';
  selected: string = '';
  form: FormGroup = new FormGroup({});
  currencies = [
    { value: 0, text: 'GBP' },
    { value: 1, text: 'EUR' },
    { value: 2, text: 'USD' },
    { value: 3, text: 'INR' },
    { value: 4, text: 'AUS' }
  ];
  chequeEntity = new Cheque({ userName: '', currencyAmount: 0, currencyType: currencyType.GBP, chequeDate: new Date });
  constructor(private fb: FormBuilder, public dialog: MatDialog) {

    this.form = fb.group({
      name: ['', [Validators.required]],
      currencyAmount: ['', [Validators.required, Validators.min(0), Validators.max(10000000000000)]],
      Currencytext: ['', [Validators.required]],
      chequeDate: ['', [Validators.required]]
    })
  }

  chequeDialogue() {
    const dialogRef = this.dialog.open(DialogueChequeContentComponent,
      { width: '60%', height: '80%', data: this.chequeEntity }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}