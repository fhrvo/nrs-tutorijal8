const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var http = require('http');
var fs = require('fs');
var url = require('url');

var app = express();

const db = require('./db.js');

app.get('/kreiraj', function(res, res){
	db.sequelize.sync({force:true}).then(function(){
	    console.log("Gotovo kreiranje tabela!");
	    res.end('Gotovo kreiranje tabela!')
	});
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/grad',function(req,res){
	let tijeloZahtjeva = '';
    req.on('data',function(data){
        tijeloZahtjeva+=data;
    });
    req.on('end',function(){
    	let parametri = new url.URLSearchParams(tijeloZahtjeva);
		let nazivGrada = parametri.get('naziv').trim();
		let brojStanovika = parametri.get('brojStanovika').trim();
		var gradovi=[];
		let errorDesio = false;
		
		gradovi.push(db.Grad.create({naziv: nazivGrada, broj_stanovnika: brojStanovika}));
		Promise.all(gradovi).catch(function(err){ errorDesio = true;
			res.end("Greska "+err);
		}).then( function(){ if(errorDesio == false) res.json("Dodan grad") }); 
	}); 
});


app.get('/gradovi', function(req, res){
    db.Grad.findAll().then(function(gradovi){
        res.send(gradovi);
    });
});

app.get('/gradovi/:id',function(req,res){
	var idGrad = req.params.id;
	db.Grad.findOne({where: {id: idGrad}}).then(function(grad){
		res.json(grad);
	})
});

app.delete("/gradovi/:id", function(req, res){
	var brisati = req.params.id;
    db.Grad.findOne({where: {id: brisati}}).then(function(Grad){
    	if (Grad != null){
	        Grad.destroy();
	        res.json('Grad obrisan');
	    } else res.end('Grad ne postoji');
    });
});

app.put("/gradovi/:id", function(req, res){
	var update = req.params.id;
	let tijeloZahtjeva = '';
    req.on('data',function(data){
        tijeloZahtjeva+=data;
    }); 
    req.on('end',function(){
    	let parametri = new url.URLSearchParams(tijeloZahtjeva);
		let brojStanovika = parametri.get('brojStanovika');
	    db.Grad.findOne({where: {id: update}}).then(function(gradovi){
	    	if (gradovi != null){
	    		if (brojStanovika != null) gradovi.broj_stanovnika = brojStanovika.trim();
		        gradovi.save();
		        res.json('Grad ažuriran');
		    } else res.end('Grad ne postoji');
	    });
    });
});

app.listen(3000);

module.exports = app;