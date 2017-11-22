$(document).ready(function(){
    $('#signup_button').click(function(){
        var email = $('#signup_mail').val();
        var pass = $('#signup_pass').val();
        var conf_pass = $('#signup_conf_pass').val();
        var cell = $('#signup_cell').val();
        if(email == "" || pass == "" || cell == "" || conf_pass == ""){
            $('#signup_status').removeClass().addClass('uk-text-danger');
            $('#signup_status').html('Email or Password or Confirm Password or Cell Number is missing!');
            return;
        }
        if(pass != conf_pass){
            $('#signup_status').removeClass().addClass('uk-text-danger');
            $('#signup_status').html('Password not matching!');
            return;
        }
        $.post('/signup/user',
                {mail:email,password:pass,phone:cell},
                function(data,status){
                    if(data == 'success'){
                        alert('Signup Successful');
                        window.location.replace('http://localhost:8080/signin');
                        return;
                    }
                    $('#signup_status').removeClass().addClass('uk-text-danger');
                    $('#signup_status').html(data);
                });
});
});