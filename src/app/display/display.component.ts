import { Component, OnInit } from '@angular/core';
import { GoodsService } from './../goods.service';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  goods =[];
  selected =[];
  category ={};
  selectedFlag=false;
  selectedGstFlag=false;
  toggleValue:boolean=false;
  index : number;
  currentSpend =[] ;
  oldRate =[];
  gstRate =[];
  changePercentage =[];
  caption:boolean =false;
  searchArray=[];
  constructor(private _goodsService : GoodsService) {

  }

  ngOnInit() {
    this._goodsService.getGoods()
      .subscribe(resGoods => {this.goods =resGoods;this.searchList(resGoods)} );
  }
  searchList(list){
    for(let i=0;i<list.length;i++){
      list[i]['name'] = list[i]['product-label'];
    }
  }
  selectedItems(good){
    this.selectedFlag=true;
    this.index = this.goods.indexOf(good);

    if(this.selected.length===0){
      this.selected.push(this.goods[this.index]['product-label']);
      this.oldRate.push(this.goods[this.index]['old-rate']);
      this.gstRate.push(this.goods[this.index]['gst-rate']);
      this.changePercentage.push(
        Math.abs(this.goods[this.index]['old-rate']-this.goods[this.index]['gst-rate'])
      );
    }else{
        for(let i in this.selected){
            if(this.selected.indexOf(this.goods[this.index]['product-label'])<0){
              this.selected.push(this.goods[this.index]['product-label']);
              this.oldRate.push(this.goods[this.index]['old-rate']);
              this.gstRate.push(this.goods[this.index]['gst-rate']);
              this.changePercentage.push(
                  Math.abs(this.goods[this.index]['old-rate']-this.goods[this.index]['gst-rate'])
                );
              return;
            }else{
              let j = this.selected.indexOf(this.goods[this.index]['product-label']);
              this.selected.splice(j,1);
              this.currentSpend[j]=0;
            }
        }
    }
  }


  selectedView(){
    this.selectedGstFlag=true;
  }
  initialView(){
    this.selectedFlag=false;
    this.selectedGstFlag=false;
    this.selected=[];
    this.currentSpend=[];

  }
  removeItem(item){
    let i =this.selected.indexOf(item);
    this.selected.splice(i,1);
  }

  calculateAmount(event:Event,index){
    this.currentSpend[index]=((<HTMLInputElement>event.target).value);
  }
  budgetAfterGst(item){
    let currVal = this.currentSpend[item];
    let val =(currVal)-
                ((currVal*this.oldRate[item])/100)+
                      ((currVal*this.gstRate[item])/100);


    return val;
  }
  getVisual(good){
    if(good['gst-rate']>good['old-rate']){
      return 'red';
    }else{
      return 'green';
    }
  }
    getColor(item){
      if(this.gstRate[this.selected.indexOf(item)]>this.oldRate[this.selected.indexOf(item)]){
        return 'red';
      }else{
        return 'green';
      }
    }
    getPercentageChange(cb,bg){
      if(cb>bg){
        this.caption=true;
        return 'green';
      }else{
        this.caption =false;
        return 'red';
      }
    }
    totalCurrentSpend(){
      let i;
      let tot : number=0;
      for(i in this.currentSpend){
        tot =tot + +this.currentSpend[i];
      }
      return tot;
    }
    totalBudgetAfterGst(){
      let i;
      let totBudget:number =0;
      for (i in this.selected){
        let currVal = this.currentSpend[i];
        let val =(currVal)-
                    ((currVal*this.oldRate[i])/100)+
                          ((currVal*this.gstRate[i])/100);
        totBudget = totBudget + val;
      }
      return totBudget;
    }
    totalChange(ct,gt){
      let change =Math.abs(ct - gt);
      let totChange=(change/ct)*100;

      return totChange;
    }
    public pieChartLabels:string[] = this.selected;
    public pieChartData:number[] =this.changePercentage;
    public pieChartType:string = 'pie';

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }
}
