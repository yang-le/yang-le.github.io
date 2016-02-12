function request(type, url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(type, url);
  xhr.onload = function () {
    callback(xhr.response);
  };
  xhr.send(null);
}

function load(src, target) {
	request('GET', src, function (data) {
		var container = document.querySelector(target);
		container.innerHTML = data;
	});
}

function toggle_drawer() {
  var layout = document.querySelector(".mdl-layout");
  layout.MaterialLayout.toggleDrawer();
}

load('header.html', 'header');
load('drawer.html', '.mdl-layout__drawer');
load('main.html', 'main');
load('footer.html', 'footer');
