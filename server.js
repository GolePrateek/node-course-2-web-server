const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');

app.use((req,res,next)=>{
  let now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(error)=>{
    if(error)
      console.log('Unable to append to server.log');
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance');
// });

app.use(express.static(__dirname+'/public'));// static data root folder set to public

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(request,response)=>{
    //response.send('<h1>Hello Express!<h1>');
    // response.send({
    //   name:'Prateek',
    //   likes:[
    //     'Reading',
    //     'Movie Buff'
    //   ]
    // });
    response.render('home.hbs',{
      pageTitle:'Home Page',
      welcomeMessage:'Welcome to my website.'
    });
});

app.get('/about',(request,response)=>{
  response.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/bad',(request,response)=>{
  response.send({
    errorMessage:'Sorry, could not process the request.'
  });
})

app.listen(port,()=>{
  console.log(`Server is up on port ${port}.`);
});
