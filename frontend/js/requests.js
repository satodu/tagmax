var angular = require('angular');
module.export = angular;
//Animation class
$.fn.extend({
    animateCss: function (animationName, esconder = false, element = 'this') {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if(esconder == true && element == 'this'){
                $(this).removeClass('animated ' + animationName);
                $(this).hide();
            }
            else if(esconder == true && element != 'this' ){
                $(element).removeClass('animated ' + animationName);
                $(element).hide();
            }
        });
    }
});