!(function(window) {

    var config;
    var nav, body, content;

    var init = function(config_json) {

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
            projectLink.href = "#" + project.link_id;
            projectLink.innerHTML = project.name;
            // create click eventlistener for projectLink
            projectLink.onclick = function() {
                // fade out content onClick
                $(content).fadeOut(250, function() {
                    // hide the content div to confirm it's invisible
                    $(content).hide();
                    // empty the content div
                    $(content).empty();
                    // embed the project
                    embedProject(project, function() {
                        // callback fades in content when done embedding
                        $(content).fadeIn(250);
                    });
                });
                return false;
            };
            // create list element
            projectLI = document.createElement('li');
            projectLI.appendChild(projectLink);
            // append list element to nav
            nav.appendChild(projectLI);
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
            case "processing" : Template.processing(project, callback);
        }
    }


    var Template = {

        processing : function(project, doneEmbedding) {

            // assemble template
            var t = [
                '<h1>' + project.name + '</h1>',
                '<canvas id="' + project.link_id + '"width="' + project.sketch_width + '" height="' + project.sketch_height + '"></canvas>',
                '<p>' + project.desc + '</p>',
                '<pre class="code prettyprint" style="display: none;"></pre>',
                '<input id="codeToggle" type="button" value="View Source">'
            ].join('');
            content.innerHTML = t;

            var canvas = $(content).find('canvas')[0]; // we use [0] to grab the first result of the jquery find() command
            var codePre = $(content).find('pre')[0];
            var codeToggle = $(content).find('#codeToggle')[0];
            codeToggle.onclick = function() {
                codeToggle.value = codePre.style.display === 'none' ? "Hide Source" : "View Source";
                $(codePre).fadeToggle();
            }

            // get project source code
            // for use in generate a new processing sketch on the canvas
            // as well as populate code <pre>
            $.get(project.src, {}, function(code) {
                var p = new Processing(canvas, code);
                // uncomment this to require clicking on the canvas to start the sketch
                // p.noLoop();
                // canvas.onclick = function() {
                //  canvas.onclick = null;
                //  p.loop();
                // }
                codePre.innerHTML = prettyPrintOne(code);
                doneEmbedding();
            }, 'html' );
        }
    }

    // init
    $(document).ready(function() {
        $.get('config.json', function(decoded_json){
            init(decoded_json);
        });
    });

})(this);
