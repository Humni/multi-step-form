# humni/multi-step-form

Requires jQuery

This multi-step-form Animator handles the and submits multi-step forms. Each
step is treated as its own form and is submitted and handled with event
handlers. The goal is to create a robust multi-step form handler.

## Documentation

#### Simple Example

Include the `multi-step-form.min.js`

```
multiStepForm.init('.multi-step-form');  
multiStepForm.addNextBtns('.multi-step-form-next');  
multiStepForm.addPrevBtns('.multi-step-form-prev');
```

#### Custom Submit Handler Example

```
multiStepForm.init('#steps-container');
multiStepForm.addNextBtns('.multi-step-form-next');

submitHandler = function (){
    var form = multiStepForm.getCurrentStep();

    //submit the form
    $.ajax({
        type: 'post',
        url: $(form).attr('action'),
        data: $(form).serialize(),
        success: function () {
            console.log('Success!');
        },
        error: function () {
            console.log('Error!');
        }
    });

    //This prevents any other submit handlers (including the default) from running
    return false;
}

//finally add the handler to the multiStepForm
multiStepForm.addHandler('submit', submitHandler);
```


#### Methods

*init(selector)*  
Sets up the multi-step-form with the selector for the container of the
multi-step-form.

*addNextBtns(selector)*  
Binds the `nextStep` to the click event of the specified selector

*addPrevBtns(selector)*  
Binds the `prevStep` to the click event of the specified selector

*addHandler(event, function) : boolean*  
This adds an event handler to one of the events. Use the `eventName` in the
event parameter, and the function parameter must be a function. If a bound event
handler returns `false`, the event will no longer bubble through the bound
handlers. Handlers executed in order of which they are bound, with the default
handler executing last.

This will return `true` if the hander was bound successfully.

*next()*  
This will go to the next step

*prev()*  
This will go to the previous step

*goToStep(step, submit = false)*  
This will go to the specified step, and will submit the current step if `submit`
 is set to `true`.

 *getCurrentStep() : jQueryObject*  
 Will return the current step of the multi-step form.

#### Events

*nextStep*  
Called when going to the next step. `stepId` is the new step number

*prevStep*  
Called when going to the previous step. `stepId` is the new step number

*submit*  
Called to submit the forms for the current step. The default handler will use
synchronous ajax to post the form to the forms action property.
