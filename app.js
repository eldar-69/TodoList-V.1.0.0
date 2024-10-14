const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// add res.render(), res.edit();

let items = ['Buy Food', 'Food', 'Eat Food'];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    let today = new Date();

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    let day = today.toLocaleDateString('en-US', options);

    // res.render('list', {listTitle: day, newListItems: items});

    // Added element res.el() and res.render{}
    // Added route parameter

    res.render('list', {listTitle: day, newListItems: items, route: '/'});

});

app.post('/', function(req,res){

    //console.log(req.body)

    let item = req.body.newItem;

    //Checking if the list that the new item came from was the worklist.

    if (req.body.list === 'Work List'){ 
        workItems.push(item);
        res.redirect('/work');
    } else {        
       items.push(item);
       res.redirect('/');
    }

})

app.get('/work', function(req, res){
    res.render('list', {listTitle: 'Work List', newListItems: workItems, route: '/work'})
})

app.post('/work', function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work')
})

app.listen(3000, function(){
    console.log('Server Started On Port 3000!');
})