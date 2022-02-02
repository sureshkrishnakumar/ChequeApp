import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subscriber } from "rxjs";
import { currencyType } from "../models/currencyType";
@Injectable({
    providedIn: 'root'
})

export class ChequeService {
    constructor(private httpClient: HttpClient) {


    }
    getChequeAmount(selectedCurrencyType: string): Observable<any> {
        let observer: Subscriber<any>;
        const chequeurl = environment.CurrencyURL + `?q=${selectedCurrencyType}_GBP&compact=ultra&apiKey=6b84111511cf46f562e9`;
        return new Observable<any>((o) => {
            observer = o;
            try {
                const localHeaders = new HttpHeaders({
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Origin': '*'
                });
                const httpOptions = { headers: localHeaders }
                this.httpClient.get<any>(chequeurl, httpOptions)
                    .subscribe((response) => {
                        observer.next(response);
                        observer.complete();
                    }
                    )
            } catch (e) {
                console.error(e);
                observer.complete();
            }

        });
    }
}