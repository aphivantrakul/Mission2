// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
	ipcRenderer.on('answer', function (event, answer) {
		document.querySelector("h1").innerHTML = answer;
	});
})

