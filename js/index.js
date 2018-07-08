var xhl = new XMLHttpRequest()
xhl.open('get','../music.json',true)
xhl.onload = function() {
	if ((xhl.status >= 200 &&xhl.status < 300)||xhl.status ===304) {
		console.log(JSON.parse(this.responseText))
	} else {
		console.log('chuchuo')
	}
}
xhl.send()