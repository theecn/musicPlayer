getMusicList(function(list){
	console.log(Array.isArray(list));
	console.log(list)
	var lists = list;
	var song = lists[0];
	var audio = new Audio(song.src);
	 audio.play()
})
function getMusicList(callback) {
	var xhl = new XMLHttpRequest()
	xhl.open('get','../music.json',true)
	xhl.onload = function() {
		if ((xhl.status >= 200 &&xhl.status < 300)||xhl.status ===304) {
			callback(JSON.parse(this.responseText))
		} else {
			console.log('helllo')
		}
	}
	xhl.send()
}
