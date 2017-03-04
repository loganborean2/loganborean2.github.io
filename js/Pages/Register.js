/**
 * Created by Deric on 2016-05-17.
 */

function Register() {
    Page.call(this);

    this.page.id = "register-page";
    this.page.className = "page";

    //build
    var title = document.createElement("h1");
    title.innerHTML = "Register";

    var wrapper = document.createElement("div");
    wrapper.className  = "wrapper";

    var form = document.createElement("form");
    form.className  = "form";
    form.id = "form-register";
    form.name = "register";

    var username = document.createElement("input");
    username.className = "";
    username.type = "text";
    username.name = "username";
    username.placeholder = "User Name";
    username.autofocus = "autoFocus";

    var password = document.createElement("input");
    password.className = "";
    password.type = "password";
    password.name = "password";
    password.placeholder = "Password";

    var confirm_password = document.createElement("input");
    confirm_password.className = "";
    confirm_password.type = "password";
    confirm_password.name = "confirm_password";
    confirm_password.placeholder = "Confirm";

    var submit = document.createElement("button");
    submit.appendChild(document.createTextNode("Register"));
    submit.addEventListener('click', function(event){
        event.preventDefault();

        //form validation
        var valid = true;
        if(password.value != confirm_password.value){
            confirm_password.className = "formInvalid";
            valid = false;
        }
        if(!valid){
            return false;
        }


        var url = "php/create_account.php"; // the script where you handle the form input.
        $.ajax({
            type: "POST",
            url: url,
            data: $("#form-register").serialize(), // serializes the form's elements.
            success: function(data) {
                //data is the echo from create_account.php
                // data == 'success' || data=='failure'
                //if(data ==) // show response from the php script.

                if(data.trim() == "success"){
                    REGISTER.setVisibility(false);
                    LOGIN.setVisibility(true);
                }
            }

        });
        return false; // avoid to execute the actual submit of the form.
    });


    var home = document.createElement("div");
    home.className = "home-button";
    home.addEventListener('click', function(){
        REGISTER.setVisibility(false);
        MENU.setVisibility(true);
    });

    this.page.appendChild(title);

    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(confirm_password);
    form.appendChild(submit);

    wrapper.appendChild(form);

    this.page.appendChild(wrapper);
    this.page.appendChild(home);
    // this.page.appendChild(mute);
}

//inheritance stuff
Register.prototype = Object.create(Page.prototype);
Register.prototype.constructor = Register;


