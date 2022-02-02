import { currencyType } from "./currencyType";

export class Cheque {
    userName: string;
    currencyAmount: Number;
    currencyType: currencyType;
    chequeDate: Date;
    //Initialise the default values
    constructor(cheque: Cheque) {
        this.userName = cheque.userName || '';
        this.currencyAmount = cheque.currencyAmount || 0;
        this.currencyType = cheque.currencyType || currencyType.GBP;
        this.chequeDate = cheque.chequeDate || '';

    }
}