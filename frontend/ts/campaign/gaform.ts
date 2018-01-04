/// <reference path="../../../typings.d.ts"/>
import * as formData from './gaoptions.json';
export class ga {
    public buildform() {
        let formElements = formData;
        for (let key in formElements) {
            $(function(){
                $('#contentGaForm').append(
                    '<div class="form-group animated fadeIn"><label>'+formElements[key].field+'</label><input class="form-control" name="'+formElements[key].field+'" /></div>'
                );
            });
        }
    }
}
let gaInit = new ga();
gaInit.buildform();