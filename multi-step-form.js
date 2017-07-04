(function(multiStepForm, $, undefined ) {

    var eventHandlers = {
        "nextStep" : [],
        "prevStep" : [],
        "submit" : []
    };

    var $currentStep;
    var $container;

    //public methods
    multiStepForm.init = function(selector){
        if(selector == null) selector = ".multi-step-form";

        $container = $(selector);
        $currentStep = $container.children().first();
        showStep();
    };

    multiStepForm.addHandler = function(evt, fnc){
        if(typeof fnc === "function"){
            eventHandlers[evt].push(fnc);
            return true;
        }

        throw "cannot bind non-function handler";
    };

    multiStepForm.addNextBtns = function(selector){
        $(selector).click(function() {
            multiStepForm.next();
        });
    };

    multiStepForm.addPrevBtns = function(selector){
        $(selector).click(function() {
            multiStepForm.prev();
        });
    };

    multiStepForm.next = function(){
        if(submit()){
            nextStep();
        }
    };

    multiStepForm.prev = function(){
        prevStep();
    };

    multiStepForm.goToStep = function(step, submit){
        if(submit === true) submit();

        $currentStep = $container.children().eq(step-1);
        showStep();
    };

    multiStepForm.getCurrentStep = function(){
        return $currentStep;
    };

    //private methods
    function callHandlers(evt){
        var handlers = eventHandlers[evt];
        if(handlers.length === 0) return;

        for(var i = 0; i < handlers.length; i ++){
            handlers[i]();
        }
    }

    function showStep(){
        $currentStep.show();
        $container.children().not($currentStep).hide();
    }

    //events
    function nextStep(){
        if(callHandlers("nextStep") === false) return;

        $currentStep = $currentStep.next();
        showStep();
    }

    function prevStep(){
        if(callHandlers("prevStep") === false) return;

        $currentStep = $currentStep.prev();
        showStep();
    }

    function submit(){
        if(callHandlers("submit") === false) return;

        if($currentStep.is("form")) {
            $forms = $currentStep;
        } else {
            $forms = $("form", $currentStep);
        }

        var success = false;
        $forms.each(function(index, element){
            if(!element.checkValidity()) {
                element.reportValidity();
                return;
            }

            $.ajax({
                type: 'post',
                url: $(element).attr('action'),
                data: $(element).serialize(),
                async: false,
                success: function () {
                    console.log('multi-step-form.js - form was submitted');
                    success = true;
                },
                error: function () {
                    console.log('multi-step-form.js - form failed to submit');
                    success = false;
                }
            });
        });
        return success;
    }

    //IE and Safari Support for reportValidity()
    if (!HTMLFormElement.prototype.reportValidity) {
        HTMLFormElement.prototype.reportValidity = function() {
            if (this.checkValidity()) return true;
            var btn = document.createElement('button');
            this.appendChild(btn);
            btn.click();
            this.removeChild(btn);
            return false;
        }
    }

}( window.multiStepForm = window.multiStepForm || {}, jQuery ));
