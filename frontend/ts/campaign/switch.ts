interface JQueryStatic {
  $ : any;
  jQuery: any;
}
function checkbox() {
    <any>jQuery(function(){
        var ga = <any>jQuery("[name='ga']").bootstrapSwitch();
        var at = <any>jQuery("[name='AT internet']").bootstrapSwitch();
        ga.bootstrapSwitch();
        at.bootstrapSwitch();
        ga.on("switchChange.bootstrapSwitch", function(event, state) {
           if(state){
                <any>jQuery('#ga').show();
                <any>jQuery("#ga").animateCss("zoomIn");
           }
           else {
                <any>jQuery("#ga").animateCss("zoomOut", true); 
           }
        });
        at.on("switchChange.bootstrapSwitch", function(event, state) {
           if(state){
                <any>jQuery('#at').show();
                jQuery("#at").animateCss("zoomIn");
           }
           else {
                <any>jQuery("#at").animateCss("zoomOut", true); 
           }
        });
    });
}
checkbox();