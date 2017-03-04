/**
 * Created by Deric on 2016-05-16.
 */


/**
 * Login page.
 * @constructor
 */
function Login() {
    Page.call(this);

    this.page.id = "login-page";
    this.page.className = "page";

    var title = document.createElement("h1");
    title.innerHTML = "Login";

    var wrapper = document.createElement("div");
    wrapper.className  = "wrapper";

    var form = document.createElement("form");
    form.className  = "form";
    form.id = "form-login";
    form.name = "login";

    var username = document.createElement("input");
    username.type = "text";
    username.name = "username";
    username.placeholder = "User Name";
    username.autofocus = "autoFocus";

    var password = document.createElement("input");
    password.type = "password";
    password.name = "password";
    password.placeholder = "Password";

    var submit = document.createElement("button");
    submit.appendChild(document.createTextNode("Login"));
    submit.addEventListener('click', function(event){
        event.preventDefault();

        var url = "php/authenticate.php"; // the script where you handle the form input.

        $.ajax({
            type: "POST",
            url: url,
            data: $("#form-login").serialize(), // serializes the form's elements.
            success: function(data) {
                
                var obj = JSON.parse(data);
                //console.log(obj);

                if(obj.logged_in == "true"){
                    PLAYER_DATA.login(obj);

                    LOGIN.setVisibility(false);
                    MENU.toggleLoginButton(true);
                    MENU.setVisibility(true);
                    username.className = "";
                    password.className = "";
                }
                else {
                    alert("incorrect username/password");
                    username.className = "formInvalid";
                    password.className = "formInvalid";
                    username.value = '';
                    password.value = '';
                }
            }
        });
        return false; // avoid to execute the actual submit of the form.
    });

    var register = document.createElement("button");
    register.appendChild(document.createTextNode("Register"));
    register.addEventListener('click', function(){
        LOGIN.setVisibility(false);
        REGISTER.setVisibility(true);
    });

    var home = document.createElement("div");
    home.className = "home-button";
    home.addEventListener('click', function(){
        LOGIN.setVisibility(false);
        MENU.setVisibility(true);
    });



    this.page.appendChild(title);

    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(submit);

    wrapper.appendChild(form);
    wrapper.appendChild(register);

    this.page.appendChild(wrapper);
    this.page.appendChild(home);

}

//inheritance stuff
Login.prototype = Object.create(Page.prototype);
Login.prototype.constructor = Login;