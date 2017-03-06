var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
  host: 'db.imad.hasura-app.io',
  user: 'gunhawk2314',
  password: 'db-gunhawk2314-94641',
  database: 'gunhawk2314',
  port: '5432'
};

var pool= new Pool(config);
app.get('/test-db', function(req, res) {
  pool.query('SELECT * FROM test', function(err,result){
      if(err){
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result));
      }
  });
});

var app = express();
app.use(morgan('combined'));

var names=[];
app.get('/submit-name', function(req, res) {
   var name= req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});

var articles= {
   'article-one': { 
    title: 'Article One | Arnav Aggarwal',
    date: 'september 5 2016',
    heading: "article one",
    content: ` <p>
                        This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
                    </p>
                    <p>
                        This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
                    </p>
                    <p>
                        This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
                    </p> `
    },
   'article-two':{
    title: 'Article Two | Arnav Aggarwal',
    date: 'september 5 2016',
    heading: "article Two",
    content: ` <p>
                        This is the content for my second article.
                    </p>`
            }
    };

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
      <head>
          <title>
              ${title}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/ui/style.css" rel="stylesheet" />
      </head> 
      <body>
          <div class="container">
              <div>
                  <a href="/">Home</a>
              </div>
              <hr/>
              <h3>
                  ${heading}
              </h3>
              <div>
                  ${date}
              </div>
              <div>
                ${content}
              </div>
          </div>
          <script type="text/javascript" src="/ui/article.js"></script>
      </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter', function(req, res){
    counter= counter+ 1;
    res.send(counter.toString());
});


app.get('/:articleName', function(req, res) {
   var articleName= req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});