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


/*
describe('Testovi za 2 zadatak', function () {
    before(function () {
        chai.request(server)
        .delete('/deleteAll')
        .end();
    });

    beforeEach(function () {
        chai.request(server)
        .post('/grad')
        .send({naziv: "Sarajevo", broj_stanovnika: 555000})
        .end((err,res)=>{
            brojac = res.body.id;
        });
    });

    afterEach(function () {
        chai.request(server)
        .delete('/deleteAll')
        .end()
    });


 
    after(function () {
        chai.request(server)
        .delete('/deleteAll')
        .end()
    });
 
 
    it('Test svi podaci iz baze', function (done) {
        chai.request(server)
            .get('/gradovi')
            .end(function (err, res) { 
                res.statusCode.should.be.eql(200);
                res.body.should.be.a('array');  
                res.body[0].should.have.property('naziv');
                res.body[0].naziv.should.be.eql("Sarajevo");
                res.body[0].broj_stanovnika.should.be.eql(555000);                           
                done();
            });
    });

    it('Test get jedan grad iz baze', function (done) {
        chai.request(server)
            .get(/gradovi/${brojac+1})
            .end(function (err, res) { 
                res.statusCode.should.be.eql(200);
                res.body.should.be.a('array'); 
                res.body[0].naziv.should.be.eql("Sarajevo");
                res.body[0].broj_stanovnika.should.be.eql(555000);                      
                done();
            });
    });

    it('Test update grad iz baze', function (done) {
        chai.request(server)
            .put(/gradovi${brojac+1})
            .send({broj_stanovnika: 555321})
            .then(()=>{
                chai.request(server)
                .get(/gradovi/${brojac})
                .end(function (err, res) { 
                res.statusCode.should.be.eql(200);
                res.body.should.be.a('array'); 
                res.body[0].naziv.should.be.eql("Sarajevo");
                res.body[0].broj_stanovnika.should.be.eql(555321);                      
                done();
            });
            });
    });

    /*it('Test delete grad iz baze', function (done) {
        chai.request(server)
            .delete(/gradovi/${brojac})
            .end(function (err, res) { 
                res.body.success.should.be.eql(true);                      
                done();
            });
    });

});*/