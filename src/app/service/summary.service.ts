import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SummaryService {

  constructor(private http: Http) { }

  // GET - One property Detail
  getPropertySummary(propertyAddress: String) {
    let propertyApi = 'api/properties/' + propertyAddress;
    return this.http.get(propertyApi)
      .map(res => res.json());
  }

  // GET -  All properties
  getPropertyList() {
    let propertyApi = 'api/properties';
    return this.http.get(propertyApi)
      .map(res => res.json());
  }

  // GET - All Bills
  getBills() {
    let propertyApi = 'api/property/bills';
    return this.http.get(propertyApi)
      .map(res => res.json());
  }

  // GET - Bills with specified criteria
  getAggregatedBills(criteria: String) {
    let propertyApi = 'api/property/aggbills/' + criteria;
    return this.http.get(propertyApi)
      .map(res => res.json());
  }

  // GET - Filtered Bills
  getDetailedBills(criteria: String) {
    let propertyApi = 'api/property/detailbills/' + criteria;
    return this.http.get(propertyApi)
      .map(res => res.json());
  }

  // INSERT - Expense / Bill
  insertBill(bill) {
    console.log("Calling Insert Bill")
    let propertyApi = 'api/property/bill';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = bill;
    console.log("Body:")
    console.log(body);
    return this.http.post(propertyApi, body, options).map(res => res.json());
  }

  // UPDATE - Expense / Bill
  updateBill(bill) {
    let propertyApi = 'api/property/bill/:id';

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = bill;

    return this.http.put(propertyApi, body, options).map(res => res.json());
  }

  // DELETE - Expense / Bill
  removeBill(bill_id) {
    let propertyApi = 'api/property/removeBill/' + bill_id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.delete(propertyApi, options).map(res => res.json());

  }


}
