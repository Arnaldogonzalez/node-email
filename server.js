const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('static'));

app.post('/send-email', function(req, res){
    console.log(req.body);
    var transport = {
        service: 'gmail',
        auth:{
            user: 'gonzalezarnaldo552@gmail.com',
            pass: 'alukard123'
        }
    };
    var transporter = nodeMailer.createTransport(transport);
    transporter.sendMail({
        from: 'noreply@gmail.com',
        to: req.body.dest_email,
        subject: req.body.subject,
        html: req.body.message
    }, function(err, info){
        if(err){
            console.log(err);
            return res.status(500).end(err);
        }
        console.log(info);
        res.redirect('/thank-you');
    });
});

app.listen(81, function(){
    console.log("server listening....");
});
