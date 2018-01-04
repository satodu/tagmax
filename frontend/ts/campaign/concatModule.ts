/// <reference path="../../../typings.d.ts"/>
import * as ATobject from './atoptions.json';
import * as GAobject from './gaoptions.json';
export class concatURL {
  propGa : {};
  constructor(){
    concatURL.prototype.setFieldsGA();
    concatURL.prototype.setFieldsAT();
    concatURL.prototype.propGa = GAobject;
  }

  public getGaObject(){
    return concatURL.prototype.propGa;
  }

  public setFieldsAT(){ 
    let at = ATobject;
     $(function(){
       $('#at').find('input').change(function(){
         console.log('working change!');
         // (<HTMLInputElement>document.getElementById('ATresult')).value = '';
         //  let fieldName = $(this).attr('name');
         //  let content = concatURL.prototype.checkSpaces($(this).val());
         //  at[fieldName].content = content;
         //  let html = '';
         //  for(let key in at){
         //    if(at[key].content != ''){
         //      html += key+'='+at[key].content+'&';
         //    }
         //  }
         //  html = html.substring(0, (<string>html).length-1);
         //  (<HTMLInputElement>document.getElementById('ATresult')).value = html;
       });
     });
  }
  public setFieldsGA(){
    //let gaobj = GAobject;
     $(function(){
       $('#ga').find('input').change(function(){
         $(this).attr('data-ng-model', 'Form.CampaignTagAdd.' + $(this).attr('name'));
         (<HTMLInputElement>document.getElementById('GAresult')).value = '';
          let fieldName = $(this).attr('name');
          let content = concatURL.prototype.checkSpaces($(this).val());
          concatURL.prototype.getGaObject()[fieldName].content = content;
          let html = '';
          for(let key in concatURL.prototype.getGaObject()){
            if(concatURL.prototype.getGaObject()[key].content != ''){
              html += key+'='+ concatURL.prototype.getGaObject()[key].content+'&';
            }
          }
          html = html.substring(0, (<string>html).length-1);
          (<HTMLInputElement>document.getElementById('GAresult')).value = html;
       });
     });
  }

  private checkSpaces(checkValue : string){
    checkValue = checkValue.replace(/ /g, '%20');
    return checkValue;
  }
}
//let concatUR = new concatURL();
