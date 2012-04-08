!(function() {

	// init
	$(document).ready(function() {
		$.get('config.json', function(decoded_json){
			init(decoded_json);
		});
	});

	var config;
    var nav, body, content;

	function init(config_json) {

		// set elements for global use
		config = config_json;
    	nav = document.getElementById('nav');
    	body = document.body;
    	content = document.getElementById('content');

		// set link_home to trigger goHome on click
		document.getElementById('link_home').onclick = goHome;

		// get project list from config json
		var projects = config.projects;

		// loop through project list and append links to nav
		projects.forEach(function(project, i) {
			// create project link
			var projectLink = document.createElement('a');
			projectLink.innerHTML = project.name;
			projectLink.setAttribute('href', '#' + project.link_id);
			// create list element
			projectLI = document.createElement('li');
			projectLI.appendChild(projectLink);
			// append list element to nav
			nav.appendChild(projectLI);
			// set click action
			projectLink.onclick = function() {
				// fade out content onClick
				$(content).fadeOut(250, function() {
					// hide the content div to confirm it's invisible
					$(content).hide();
					// empty the content div
					$(content).empty();
					// embed our project
					embedProject(project, function() {
						// callback to fade in content when done embedding
						$(content).fadeIn(250);
					});
				});
				return false;
			}
		});

		// first action is home
		goHome();
	}


	function goHome() {
		$(content).fadeOut(250, function() {
			$(content).empty();
		});
		return false;
	}


	function embedProject(project, callback) {

		switch(project.type) {
			case "processing" :

				// create a <h1> with the project name
				var headline = document.createElement('h1');
				headline.innerHTML = project.name;

				// create a new <canvas> for our processing sketch
				var canvas = document.createElement('canvas');
				canvas.setAttribute('id', project.link_id);
				canvas.setAttribute('width',  project.sketch_width);
				canvas.setAttribute('height', project.sketch_height);

				// create description <p>
				var desc = document.createElement('p');
				desc.innerHTML = project.desc;

				// source code <pre>
				var codePre = document.createElement('pre');
				codePre.style.display = 'none';
				codePre.setAttribute("class", "code prettyprint");

				// toggle source button
				var codeToggle = document.createElement("input");
				canvas.setAttribute("id", "codeToggle");
				codeToggle.type = "button";
				codeToggle.value = "View Source";
				codeToggle.onclick = function(e) {
					codeToggle.value = codePre.style.display === 'none' ? "Hide Source" : "View Source";
					$(codePre).fadeToggle();
				}

				// assemble project layout
				content.appendChild(headline);
				content.appendChild(canvas);
				content.appendChild(desc);
				content.appendChild(codePre);
				content.appendChild(rawSourceLink);
				content.appendChild(codeToggle);

				// get project source code and use it to generate a new processing sketch on the canvas
				$.get(project.src, {}, function(code) {
					var p = new Processing(canvas, code);
					/*
					// uncomment this to require clicking on the canvas to start the sketch
					p.noLoop();
					canvas.onclick = function() {
						canvas.onclick = null;
						p.loop();
					}
					*/
					codePre.innerHTML = prettyPrintOne(code);
					callback();
				}, 'html' );
		}
	}

})();

