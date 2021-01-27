const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
	const path = req.url;
	const method = req.method;
	
	if (path == "/questions" && method === 'GET') {
		const questions = {
			1: "What is your favorite color?",
			2: "What is your favorite food?",
			3: "What is your favorite animal?"
		}

		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.end(JSON.stringify(questions));
	} else if (path == "/answers" && method === 'GET') {
		const answers = {
			1: "Blue",
			2: "Sushi",
			3: "Cats & Dogs"
		}

		res.statusCode = 200;
		res.setHeader('content-Type', 'application/json');
		res.end(JSON.stringify(answers));
	}
});

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});