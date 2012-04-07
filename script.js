function init(content_json) {

    var nav = document.getElementById('nav'),
    	content = document.getElementById('content'),
    	projectDiv = document.getElementById('project'),
		link_home = document.getElementById('link_home');

	function goHome() {
		$(projectDiv).fadeOut(400, function() {
			$(projectDiv).hide();
			$(projectDiv).empty();
			$(projectDiv).html("<h1>Home</h1>");
			$(projectDiv).fadeIn(400);
		})
	}    
	link_home.onclick = goHome;

	// project list
	var projects = content_json.content.projects;

	// loop through project list and create side links
	projects.forEach(function(project, i) {

		// create project link
		var projectLink = document.createElement('a');
		projectLink.innerHTML = project.name;
		projectLink.setAttribute('href', '#' + project.link_id);
		projectLink.onclick = function() {
			$(projectDiv).fadeOut(400, function() {
				$(projectDiv).empty();
				$(projectDiv).hide();
				embedProject(project);
			});
			return false;
		}

		// create list element
		projectLI = document.createElement('li');
		projectLI.appendChild(projectLink);

		// append list element to nav
		nav.appendChild(projectLI);

	});

	function embedProject(project) {

		switch(project.type) {
			case "processing" : 


				var headline = document.createElement('h1');
				headline.innerHTML = project.name;
				
				var canvas = document.createElement('canvas');
				canvas.setAttribute('id', project.link_id);
				canvas.setAttribute('data-processing-sources', project.src);
				canvas.setAttribute('width',  project.sketch_width);
				canvas.setAttribute('height', project.sketch_height);

				var desc = document.createElement('p');
				desc.innerHTML = project.desc;

				var srcLink = document.createElement('a');
				srcLink.setAttribute('href', project.src);
				srcLink.innerHTML = 'Source Code';

				projectDiv.appendChild(headline);
				projectDiv.appendChild(canvas);
				projectDiv.appendChild(desc);
				projectDiv.appendChild(srcLink);

				content.appendChild(projectDiv);

				$.get(project.src, {}, function(code) {
					var p = new Processing(canvas, code);
					$(projectDiv).fadeIn(projectDiv);
				}, 'html' );

		}
	}	

	goHome();
}

$(document).ready(function() {
	$.get('content.json', function(decoded_json){
		init(decoded_json);
	});
});





