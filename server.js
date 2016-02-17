var express		= require('express');
var app 		= express();
var bodyParser	= require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

var threads = [
{id: 1,title: "What is lorem ipsum?", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
{id: 2,title: "Why do we use it?", text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."},
{id: 3,title: "Where does it come from?", text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32."},
{id: 4,title: "Where can i get some?", text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}
];

var thread = threads;

app.get('/threads', function (req, res)
{
	res.sendFile('selectthread.html', { root: __dirname + '/public'});
});

app.get('/threads', function (req, res)
{
	res.sendFile('threads.html', { root: __dirname + '/public'});
});

app.get('/thread/:id', function (req, res)
{
	res.sendFile('thread.html', { root: __dirname + '/public'});
});

app.post('/api/threads', function (req, res)
{
	threads.push({

		id: parseInt(req.body.id),
		title: req.body.title,
		text: req.body.text

	});
	res.json({ status: "ok", insertId: threads.length - 1});
});

app.get('/api/threads', function (req, res)
{

	res.json({ threads: threads});
});

app.get('/api/threads/:id', function (req, res)
{

	var thread = threadInsertId(req.params.id);

	if(typeof thread === 'undefined')
	{

		res.json({ status: 'error'})

	} else {

		res.json(thread)

	}
})

//funktion för att få mitt id i arrayn att fungerar som mitt id jag använder för att kunna tabort eller uppdatera.
function threadInsertId(id){

	for (var i = 0; i < threads.length; i++)
	{

		if(threads[i].id == parseInt(id))
		{

			return threads[i];

		}
	}
};

//funktion för att få mitt id i arrayn att fungerar som mitt id jag använder för att kunna tabort eller uppdatera.
function getThreadIndex(id){

	for (var i = 0; i < threads.length; i++)
	{

		if(threads[i].id == parseInt(id))
		{

			return i;

		}
	}
};

app.put('/api/threads/:id', function (req, res)
{

	var threadId = threadInsertId(req.params.id);

	var status = 'error';

	if(threadId.id !== 'undefined')
	{
		threadId.title = req.body.title;
		threadId.text = req.body.text;

		status = 'OK';
	}

	res.json({ status: status})

});

app.delete('/api/threads/:id', function (req, res)
{

	var deleteThread = getThreadIndex(parseInt(req.params.id));

		threads.splice(deleteThread, 1);

		res.json({ status: 'OK', message: 'deleted successfully'});

});


app.use(express.static("public"));

app.use('/', router);
app.listen(port);
console.log('Up and runing at port' + port);


