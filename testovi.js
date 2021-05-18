let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const server = require('./web.js');
let grad = {id:1, naziv: 'Sarajevo', brojStanovnika:100000}; 
const db = require('./db.js');

describe('testiranje GET', function () {
	beforeEach(function (done) {
        chai.request(server).get('/kreiraj').end((err, res) => {
        		var gradovi=[];
        		gradovi.push(db.Grad.create({naziv: "Sarajevo", broj_stanovnika: 100000}));
				Promise.all(gradovi).catch(function(err){ errorDesio = true;
					res.end("Greska "+err);
				})
				done();
			});
    });


	it('GET gradovi test', function (done) {
		chai.request(server)
			.get('/gradovi')
			.end((err, res) => {
				res.should.be.json;
				res.body.should.be.a('array');
				done();
			});
	});

	it('GET grad test', function (done) {
		chai.request(server)
			.get('/gradovi/1')
			.end((err, res) => {
				res.should.be.json;
				res.body.should.be.a('object');
				done();
			});
	});
});


describe('testiranje POST', function () {
	beforeEach(function (done) {
        chai.request(server).get('/kreiraj').end((err, res) => {
				done();
			});
    });


	it('Post metoda', function (done) {
		chai.request(server)
			.post('/grad')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({naziv: "Sarajevo", brojStanovika: 1234})
			.end((err, res) => {
				res.body.should.be.eql("Dodan grad");
				done();
			});
	});
});

describe('testiranje DELETE', function () {
	beforeEach(function (done) {
        chai.request(server).get('/kreiraj').end((err, res) => {
        		var gradovi=[];
        		gradovi.push(db.Grad.create({naziv: "Sarajevo", broj_stanovnika: 100000}));
				Promise.all(gradovi).catch(function(err){ errorDesio = true;
					res.end("Greska "+err);
				})
				done();
			});
    });


	it('DELETE gradovi test', function (done) {
		chai.request(server)
			.delete('/gradovi/1')
			.end((err, res) => {
				res.body.should.be.eql("Grad obrisan"); 
				done();
			});
	});
});

describe('testiranje PUT', function () {
	beforeEach(function (done) {
        chai.request(server).get('/kreiraj').end((err, res) => {
        		var gradovi=[];
        		gradovi.push(db.Grad.create({naziv: "Sarajevo", broj_stanovnika: 100000}));
				Promise.all(gradovi).catch(function(err){ errorDesio = true;
					res.end("Greska "+err);
				})
				done();
			});
    });


	it('PUT gradovi test', function (done) {
		chai.request(server)
			.put('/gradovi/1')
			.send({brojStanovika: 123})
			.end((err, res) => {
				res.body.should.be.eql("Grad ažuriran"); 
				done();
			});
	});
});