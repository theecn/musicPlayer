var currentIndex = 0;
var clock;
var musicList = [];
var audio = new Audio();
 audio.autoplay = true;
getMusicList(function(list){
	musicList = list;
	console.log(musicList)
	loadMusic(list[currentIndex])
	// audio.play()
})
audio.ontimeupdate = function(){
	$('.now').style.width = (this.currentTime/this.duration)*100+"%";

}
audio.onplay = function() {
	clock = setInterval(function(){
		var min = Math.floor(audio.currentTime/60);
		var sec = Math.floor(audio.currentTime)%60+'';
		sec = sec.length===2?sec:'0'+sec;
		$('.times').innerText = min + ':'+sec;
	},1000)
}
audio.onpause = function() {
	clearInterval(clock);
}
$('#player').onclick = function() {
	if (audio.paused) {
		audio.play();
		this.classList.remove('icon-play');
		this.classList.add('icon-pause');
		
	} else {
		audio.pause();	
		this.classList.remove('icon-pause');
		this.classList.add('icon-play');
		
	}
}
$('#prev').onclick = function() {
	currentIndex = (musicList.length+(--currentIndex))%musicList.length;
	loadMusic(musicList[currentIndex]);
}
$('#next').onclick = function() {
	currentIndex = (++currentIndex)%musicList.length;
	console.log(currentIndex)
	loadMusic(musicList[currentIndex]);
}
function $(elem) {
	return document.querySelector(elem);
}
function getMusicList(callback) {
	var xhl = new XMLHttpRequest()
	xhl.open('get','../music.json',true)
	xhl.onload = function() {
		if ((xhl.status >= 200 &&xhl.status < 300)||xhl.status ===304) {
			callback(JSON.parse(this.responseText))
		} else {
			console.log('net work problems')
		}
	}
	xhl.send()
}
function loadMusic(musicobj) {
	$('#names').innerText = musicobj.title;
	console.log(musicobj.title)
	$('#singer').innerText = musicobj.author;
	// $('.cover').style.bakcground.url =  musicobj.imgs;
	audio.src = musicobj.src;

}