var express = require('express'),
    app = express(),
    router = express.Router(),
    port = process.env.PORT || 8080,
    path = __dirname + '/public/html/',
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    spawn = require('child_process').spawn;
    
con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'user',
    password:'Ilovemyindia1!',
    multipleStatements: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

con.connect(function(err){
    if(err) throw err;
    console.log('Connected!');
});

app.use('/',router);

app.use(express.static('public'));

router.get('/home',function(req,res){
    res.sendFile(path + 'home.html')
});

router.get('/shome',function(req,res){
    res.sendFile(path + 'shome.html')
});

router.get('/signout',function(req,res){
    res.sendFile(path + 'home.html')
});

router.get('/',function(req,res){
    res.sendFile(path + 'home.html')
});

router.get('/about',function(req,res){
    res.sendFile(path + 'about.html')
});

router.get('/sabout',function(req,res){
    res.sendFile(path + 'sabout.html')
});

router.get('/contact',function(req,res){
    res.sendFile(path + 'contact.html')
});

router.get('/scontact',function(req,res){
    res.sendFile(path + 'scontact.html')
});

router.get('/pricing',function(req,res){
    res.sendFile(path + 'pricing.html')
});

router.get('/spricing',function(req,res){
    res.sendFile(path + 'spricing.html')
});

router.get('/signin',function(req,res){
    res.sendFile(path + 'signin.html')
});

router.get('/signup',function(req,res){
    res.sendFile(path + 'signup.html')
});

router.get('/signedin',function(req,res){
    res.sendFile(path + 'signedin.html');
});

router.post('/signin/user',function(req,res){
        var query = 'select * from user_credentials where mail="'+req.body.mail + '" and password="' + req.body.password + '";';
        con.query(query,function(err,result){
            if(err){
                console.log(err);
                return res.send(404);
            }
            else if(result.length == 0){
                return res.status(200).send('No User exists')
            }
            else{
                console.log('Login Successful');
                res.send('User exists');
            }
        })
});

router.post('/signup/user',function(req,res){
    var query = 'insert into user_credentials(mail,password,cell) values("'+req.body.mail + '","' + req.body.password + '","' + req.body.phone + '");';
    con.query(query,function(err,result){
        if(err)
            if(err.code == 'ER_DUP_ENTRY'){
                return  res.send('User already exists.Proceed to singin page');
            }
        return res.send('success');
    });
});

router.post('/search',function(req,res){
    var query = 'select casename from case_table where Court="' + req.body.court + '";';
    con.query(query,function(err,result){
            res.send(JSON.stringify(result));
    });
});

router.post('/recommend',function(req,res){
    console.log('in recommend');
    var process = spawn('python3',['Back End/Search.py',req.body.query]);
    process.stdout.on('data',function(data){
            return res.send(data);
    });
    process.stderr.on('data',function(data){        
        console.log(data.toString('utf8'));
    })
});

app.listen(port,function(){
    console.log('Server Listerning at port: ' + port);
});