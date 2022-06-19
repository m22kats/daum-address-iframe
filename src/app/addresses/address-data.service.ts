import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Address } from "./address";

@Injectable({
  providedIn: 'root'
})
export class AddressDataService {
  private baseUrl = `${environment.gateway}`;

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Address[]> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .get<Address[]>(url, { headers })
      .pipe
      // tap(data => console.log(JSON.stringify(data)))
      ();
  }

  create(payload: Address): Observable<any[]> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    const covertedPayload = {
      name: payload.name,
      details: {
        sido: payload.details.sido,
        sigungu: payload.details.sigungu,
        roadAddress: payload.details.roadAddress,
        extraAddress: payload.details.extraAddress
      }
    }
    return this.http
    .post<any[]>(url, covertedPayload, { headers })
    .pipe
    // tap(data => console.log(JSON.stringify(data)))
    ();
  }
}
