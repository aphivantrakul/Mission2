// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, net} = require('electron');
const path = require('path');
const QnAService = require("./QnAService");

let questions = {};
let mainWindow;

async function createMainWindow () {

	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});

	try {
		questions = await getQuestions();
		await mainWindow.loadFile('index.html');
		mainWindow.webContents.send('questions', questions);
	} catch (error) {
		console.error(error);
	}

}

app.whenReady().then(() => {
  	createMainWindow();
  
  	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) {
			createMainWindow();
		}
	});

	mainWindow.on('closed', function () {
		app.quit();
	});


})

let answerWindow;
let answers = {};

ipcMain.on('questionClicked', async function(event, questionNum) {
	if (answerWindow == null) {
			answerWindow = new BrowserWindow({
			width: 400,
			height: 300,
			webPreferences: {
				preload: path.join(__dirname, 'answerPreload.js')
			}
		});

		try {
			answers = await getAnswers();
			await answerWindow.loadFile('answer.html');
		} catch(error) {
			console.error(error);
		}
	}

	answerWindow.webContents.send('answer', answers[questionNum]);

	answerWindow.on("closed", function() {
		answerWindow = null;
	});
});

function getQuestions() {
  return new Promise(function(resolve, reject) {

		const request = net.request('http://localhost:3000/questions');

		request.on('response', (response) => {
			response.on('data', (data) => {
				resolve(JSON.parse(data.toString()));
			});
		});

		request.end();

	});
}

function getAnswers() {
  return new Promise(function(resolve, reject) {

		const request = net.request('http://localhost:3000/answers');

		request.on('response', (response) => {
			response.on('data', (data) => {
				resolve(JSON.parse(data.toString()));
			});
		});

		request.end();

	});
}

















