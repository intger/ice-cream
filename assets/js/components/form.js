export function Form() {
    // Form
    const multiPartForm = document.querySelector('.custom-form #gp-form');
    // Strings
    const empty_error = 'Please fill the required fields';
    const empty_checkboxes = 'Please select at least one ice cream taste';
    const email_error = 'Please enter a valid email address';
    const successMessage = "<p>Thank you for submiting the form</p>";

    if (multiPartForm) {
        // Elements
        const nextBtn = multiPartForm.querySelector('.next-btn');
        const prevBtn = multiPartForm.querySelector('.back-btn');
        const submitBtn = multiPartForm.querySelector('.custom-submit');
        const error_message = multiPartForm.querySelector('.gp-error');
        const success_message = multiPartForm.querySelector('.gp-success');
        const steps_container = multiPartForm.querySelector('.gp-steps');
        const step1_div = multiPartForm.querySelector('.gp-step.step-1');
        const step2_div = multiPartForm.querySelector('.gp-step.step-2');
        const step1_fields = [...multiPartForm.querySelectorAll('.gp-step.step-1 input.gp-validate')];
        const step2_fields = [...multiPartForm.querySelectorAll('.gp-step.step-2 input.gp-validate')];

        const isEmail = function (email) {
            let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }
    
        const atLeastOneIsChecked = function (checkboxClass) {
            const checkedCheckboxes = [...document.querySelectorAll(`.${checkboxClass}:checked`)];
            return checkedCheckboxes.length;
        }
    
        const showErrors = function(errors, errorInputs) {
            let errorsOutput = "<strong>Please fix the following errors:</strong><br><ul>";
            for (let i in errors) {
                errorsOutput += "<li>" + errors[i] + "</li>";
            }
    
            for (let i in errorInputs) {
                errorInputs[i].classList.add('gp-invalid')
            }
    
            errorsOutput += "</ul>";
            error_message.innerHTML = errorsOutput;
            error_message.style.display = 'block';
        }
    
        const clearErrorAndSuccessMsg = function() {
            error_message.innerHTML = '';
            error_message.style.display = 'none';
            success_message.innerHTML = '';
            success_message.style.display = 'none';
            step1_fields.forEach(field => {
                field.classList.remove('gp-invalid');
            });
            step2_fields.forEach(field => {
                field.classList.remove('gp-invalid');
            });
            document.querySelector('.gp-step.step-2 .checkboxes-box').classList.remove('gp-invalid');
        }
    
        const showFirstStep = function() {
            // prevBtn.hide();
            // submitBtn.hide();
            step2_div.style.marginLeft = '100%';
    
            // nextBtn.show();
            step1_div.style.marginLeft = '0';
            steps_container.style.maxHeight = '400px';
        }
    
        const showSecondStep = function() {
            // nextBtn.hide();
            step1_div.style.marginLeft = '-100%';
    
            // prevBtn.show();
            // submitBtn.show();
            step2_div.style.marginLeft = '0';
            steps_container.style.maxHeight = 'inherit';
        }
    
        const showSuccessMsg = function() {
            success_message.innerHTML = successMessage;
            success_message.style.display = 'block';
    
            document.querySelector("#gp-form .gp-step input:not([type='checkbox']):not([type='submit']").value = '';
            document.querySelector("#gp-form .gp-step input.custom-checkbox").checked = false;
        }
        
        nextBtn.addEventListener('click', function (e) {
            e.preventDefault();
    
            clearErrorAndSuccessMsg();
            let errors = [];
            let errorInputs = [];
    
            step1_fields.forEach((input, i) => {
                if ( input.value.trim().length == 0 ) {
                    // empty fields error
                    errors['empty_error'] = empty_error;
                    errorInputs.push(input);
                }
    
                if ( input.getAttribute('type') === 'email' && !isEmail(input.value) ) {
                    // validate email field error
                    errors['email_error'] = email_error;
                    errorInputs.push(input);
                }
            })
    
            if (Object.keys(errors).length > 0) {
                showErrors(errors, errorInputs);
                steps_container.style.maxHeight = '400px';
            }
            else {
                steps_container.style.maxHeight = 'inherit';
                // Next step
                showSecondStep();
            }
        });
    
        prevBtn.addEventListener('click', function (e) {
            e.preventDefault();
            clearErrorAndSuccessMsg();
            showFirstStep();
        })
    
        submitBtn.addEventListener('click', function (e) {
            e.preventDefault();
    
            clearErrorAndSuccessMsg();
    
            let errors = [];
            let errorInputs = [];

    
            step2_fields.forEach((input, i) => {
                if ( input.value.trim().length == 0 ) {
                    // empty fields error
                    errors['empty_error'] = empty_error;
                    errorInputs.push(input);
                }
            })
    
            if ( !atLeastOneIsChecked('gp-validate-checkbox') ) {
                errors['empty_checkboxes'] = empty_checkboxes;
                errorInputs.push(document.querySelector('.gp-step.step-2 .checkboxes-box'));
            }
    
            if (Object.keys(errors).length > 0) {
                showErrors(errors, errorInputs);
            }
            else {
                // Submit form
                let email = multiPartForm.querySelector('#email').value;
                let firstname = multiPartForm.querySelector('#firstname').value;
                let lastname = multiPartForm.querySelector('#lastname').value;
                let servings = multiPartForm.querySelector('#servings').value;
                let month_supply = multiPartForm.querySelector('#month-supply').value;
                let ice_cream = [...multiPartForm.querySelectorAll('.custom-checkbox:checked')].map(el => { return el.value; });
    
                let hubspotJSON = {
                    "fields": [
                        {
                            "name": "email",
                            "value": email
                        },
                        {
                            "name": "firstname",
                            "value": firstname
                        },
                        {
                            "name": "lastname",
                            "value": lastname
                        },
                        {
                            "name": "servings",
                            "value": servings
                        },
                        {
                            "name": "month_supply",
                            "value": month_supply
                        }
                    ],
                    "skipValidation" : true,
                    "context": {
                        "pageUri": gpAjax.homeURL,
                    },
                }
    
                for (let i in ice_cream ) {
                    hubspotJSON['fields'].push({
                        "name": "ice_cream",
                        "value": ice_cream[i]
                    })
                }
                // push form info to Hubspot
                fetch(gpAjax.hubspotFormURL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( hubspotJSON )
                })
                .then(response => response.json())
                .then(content => {
                    if ( content.status !== "error" ) {
                        showSuccessMsg();
                    }
                });
            }
        })
    }
};


