var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('Data API', function(){
	it('should list ALL data objects on /api/threads GET', function(done){
		chai.request('http://127.0.0.1:3000').get('/api/threads').end(function(err, res){

			res.should.have.status(200);

			res.should.be.json;

			res.body.should.be.an('object');

			res.body.threads.should.be.an('array');

			done();
		});
	});

	it('should list a SINGLE object on /api/threads/<id> GET', function(done) {
		chai.request('http://127.0.0.1:3000').get('/api/threads/1').end(function(err, res) {
			
			res.should.have.status(200);

			
			res.should.be.json;

	
			res.body.should.be.an('object');


			res.body.title.should.be.a('string');
			res.body.text.should.be.a('string');

		
			done();
		});
	}); 

	
	it('should add a SINGLE object on /api/threads POST', function(done) {
		var id = 5;
		var title = 'test' + Math.random();
		var text = 'test' + Math.random();

		chai.request('http://127.0.0.1:3000')
		.post('/api/threads')
		.set("Content-Type", "application/x-www-form-urlencoded")

		.send({ title: title, text: text, id: id })

		.end(function (err, res) {
			console.log(title)
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.an('object');
			res.body.status.should.be.a('string');


			chai.request('http://127.0.0.1:3000').get('/api/threads/' + id).end(function (err, res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.an('object');
				console.log(title);
				res.body.id.should.equal(id);
				res.body.title.should.equal(title);
				res.body.text.should.equal(text);

				done();
			});

		});
	});

	it('should update a SINGLE object on /api/threads/<id> PUT', function(done) {
		var title = 'update' + Math.random();
		var text = 'update' + Math.random();
		var id = 4;

		chai.request('http://127.0.0.1:3000').put('/api/threads/' + id)
		.set("Content-Type", "application/x-www-form-urlencoded")
		.send({ title: title, text: text, id: id })
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.an('object');
			res.body.status.should.be.a('string');
			res.body.status.should.equal('OK');

			done();
		});
	});

	it('should delete a SINGLE object on /api/threads/<id> DELETE', function(done) {
		chai.request('http://127.0.0.1:3000').delete('/api/threads/' + 4).end(function(err, res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.an('object');
			res.body.status.should.be.a('string');
			res.body.status.should.equal('OK');

			done();
		});
	});
});