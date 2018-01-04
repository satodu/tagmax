/// <reference path="../../../typings.d.ts"/>
import * as formData from './atoptions.json';
class atCreate  {
    private checkFormExist : false;
    
    destroyForm(){
            $('#contentAtForm').children().hide(); 
    }

    private buildform(formOption:any) {
        let formElements : any[] = formData[formOption];
        atCreate.prototype.destroyForm();
        for (let formElement of formElements) {
            jQuery('#contentAtForm').append(
                '<div class="form-group animated fadeIn"><label>'+formElement.field+'</label><input class="form-control" name="'+formElement.field+'" /></div>'
            );
        }
    }

    public atform() {
        jQuery(function(){
            jQuery('.selectpicker').on('loaded.bs.select', function () {
                return atCreate.prototype.buildform("Sponsor Links");
            });
            jQuery('.selectpicker').on('changed.bs.select', function () {
                let option:string = $(this).val();
                return atCreate.prototype.buildform(option);
            });
        });
    }
}
let atForminit = new atCreate;
//atForminit.atform();
