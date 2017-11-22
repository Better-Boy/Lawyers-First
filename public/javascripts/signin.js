$(document).ready(function(){
    $('#signin_button').click(function(){
            var email = $('#signin_mail').val().trim();
            var pass = $('#signin_pass').val().trim();
            if(email == "" || pass == ""){
                $('#signin_status').removeClass().addClass('uk-text-danger');
                $('#signin_status').html('Email or Password is missing!');
                return;
            }
            $.post('http://localhost:8080/signin/user',
                    {mail:email,password:pass},
                    function(data,status){
                        if(data == 'no user'){
                            $('#signin_status').removeClass().addClass('uk-text-danger');
                            $('#signin_status').html('User Not Found. Please Check the credentials or signup');
                            return;
                        }
                        else if(data == 'User exists'){
                            alert('Signin Successful');
                            window.location.replace('http://localhost:8080/signedin');
                        }
                    });
    });
});