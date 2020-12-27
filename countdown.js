"use strict";

// Change to false if you don't want a timer
const showTimer = true;

// Set timer countdown time here in minutes : seconds format
const time = 0 + ":" + 19;

var	globalSetting = false;


// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
	apiKey: "",
	authDomain: "truthordare-fc8b4.firebaseapp.com",
	databaseURL: "https://truthordare-fc8b4-default-rtdb.firebaseio.com",
	storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();


function writeQuestionData(content) {
  // firebase.database().ref('users/' + userId).set({
  //   username: name,
  //   email: email,
  //   profile_picture : imageUrl
  // });

	  // Create a new post reference with an auto-generated id
	var postListRef = firebase.database().ref('questions');
	var newPostRef = postListRef.push();
	newPostRef.set({
	    content: content, 
	    status: false
	});
}
// writeQuestionData("Hello This is test")



function startData() {
  // firebase.database().ref('users/' + userId).set({
  //   username: name,
  //   email: email,
  //   profile_picture : imageUrl
  // });

	  // Create a new post reference with an auto-generated id
	var postListRef = firebase.database().ref('start');
	postListRef.set({
	    status: true,
	    content: ""
	});
}

function stopData(result) {
  // firebase.database().ref('users/' + userId).set({
  //   username: name,
  //   email: email,
  //   profile_picture : imageUrl
  // });

	  // Create a new post reference with an auto-generated id
	var postListRef = firebase.database().ref('start');
	postListRef.set({
	    status: false,
	    content:result
	});

	globalSetting = false

}



// Add list of names here
var namesList = [
	'Anne',
	'Bob',
	'Catherine', 
	'Dave',
	'Erin',
	'Frank',
	'Gloria',
	'test'
	// 'test',
	// 'test',
	// 'test',
	// 'test',
	// 'test',
	// 'test',
	// 'test',
	// 'test',
	// 'test',
	// 'test',
	// 'test',
	// 'test',
	// 'test',
	// 'test',
	// 'test'
];

// Default variables
let i = 0;
let x = 0;
let intervalHandle = null;
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const headerOne = document.getElementById('headerNames');
const timesUp = document.getElementById('timesUp');

// const timerWrapper = document.getElementById('timerWrapper');
// const timer = document.getElementById('timer');

// Optional countdown timer
// Add zero in front of numbers < 10
function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
		sec = "0" + sec;
	} 
  if (sec < 0) {
		sec = "59";
	}
  return sec;
}

const startTimer = function() {
  // const presentTime = timer.innerHTML;
  // const timeArray = presentTime.split(/[:]+/);
  // let m = timeArray[0];
  // let s = checkSecond((timeArray[1] - 1));
	
 //  if (s==59) {
	// 	m = m-1;
	// }
 //  if (m < 0) {
	// 	timesUp.style.display = "block";
	// }
  
 //  timer.innerHTML = m + ":" + s;
	
	// setTimeout(startTimer, 1000);
}

// Start or stop the name shuffle on button click
startButton.addEventListener('click', function() {
	this.style.display = "none";
	stopButton.style.display = "block";
	globalSetting = true;
	intervalHandle = setInterval(function () {
		if (globalSetting){
			var item = namesList[Math.floor(Math.random() * namesList.length)];
			headerNames.textContent = item;
			console.log("hey")
		}
		// headerNames.textContent = namesList[i++ % namesList.length];
	}, 50);
	// if (showTimer===true) {
	// 	timerWrapper.classList.remove('visible');
	// }
	startData()
});

stopButton.addEventListener('click', function() {
	// this.style.display = "none";
	// startButton.style.display = "block";
	// clearInterval(intervalHandle);
	// timer.innerHTML = time;
	// if (showTimer===true) {
	// 	timerWrapper.classList.add('visible');
	// }
	// startTimer();
	stopData(headerNames.textContent);
});

// Allow use of spacebar to start/stop name shuffle
// document.body.onkeyup = function(e) {
// 	if (e.keyCode == 32) {
// 		if (x%2===0) {
// 			startButton.style.display = "none";
// 			stopButton.style.display = "block";
// 			intervalHandle = setInterval(function () {
// 				headerNames.textContent = namesList[i++ % namesList.length];
// 			}, 50);
// 			// if (showTimer===true) {
// 			// 	timerWrapper.classList.remove('visible');
// 			// }
// 		} else {
// 			startButton.style.display = "block";
// 			stopButton.style.display = "none";
// 			clearInterval(intervalHandle);
// 			// timer.innerHTML = time;
// 			// if (showTimer===true) {
// 			// 	timerWrapper.classList.add('visible');
// 			// }
// 			startTimer();
// 		}
// 		x++; 
// 	}
// } 

// // Blinking warning
// var backgroundInterval = setInterval(function() {
//   timesUp.classList.toggle("backgroundRed");
// }, 1000)






// let items = [
//         'Blue',
//         'Red',
//         'White',
//         'Green',
//         'Black',
//         'Orange'
//     ],

var ul = document.createElement('ul');

const myNode = document.getElementById('list');
myNode.innerHTML = '';
document.getElementById('list').appendChild(ul);

// items.forEach(function (item) {
//     let li = document.createElement('li');
//     ul.appendChild(li);

//     li.innerHTML += item;
// });


var questionListeners = firebase.database().ref('questions');
questionListeners.on('value', function(snapshot) {
    // updateStarCount(postElement, snapshot.val());
    namesList = []
    var object = snapshot.val()
// console.log(snapshot.val())


	
	var ul = document.createElement('ul');

	const myNode = document.getElementById('list');
	myNode.innerHTML = '';
	document.getElementById('list').appendChild(ul);




	for (const property in object) {
  		namesList.push(object[property].content);
  		// console.log(property)

  		let li = document.createElement('li');
	    ul.appendChild(li);
	    li.className = "tests"

	    li.innerHTML += object[property].content;
	}

    console.log(namesList)
});





function displayDate(){

	var data = document.getElementById("data").value
	if (data != ""){
		writeQuestionData(data)
		document.getElementById("data").value = ""
	}
}

document.getElementById("sent").addEventListener("click", displayDate);






var questionListeners = firebase.database().ref('start');
questionListeners.on('value', function(snapshot) {
    // updateStarCount(postElement, snapshot.val());
    var object = snapshot.val()
// console.log(snapshot.val())
	console.log(object)
	if (object.status === true){
		startButton.style.display = "none";
		stopButton.style.display = "block";
		intervalHandle = setInterval(function () {
			var item = namesList[Math.floor(Math.random() * namesList.length)];
			headerNames.textContent = item;

			// headerNames.textContent = namesList[i++ % namesList.length];
		}, 50);
	}else{
		stopButton.style.display = "none";
		startButton.style.display = "block";
		// var interval_id = window.setInterval("", 9999); // Get a reference to the last
		// for (var i = 1; i < interval_id; i++)
		//         window.clearInterval(i);
		//for clearing all intervals

		clearInterval(intervalHandle);

		console.log("DEBUG")
		headerNames.textContent =  object.content
			globalSetting = false

	}
});


