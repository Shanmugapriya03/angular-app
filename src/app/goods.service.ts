import { Injectable } from '@angular/core';
import { Headers , Http , Response} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class GoodsService {
  constructor(private _http: Http) {

  }
  getGoods() {
    return this._http.get('assets/data.json')
    .map( (response: Response) => response.json());
  }

}
