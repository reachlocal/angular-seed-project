/**
 * A few, basic utilities to dynamically load JS files to a page after the page
 * has been loaded.
 **/
(function () {

    /**
     * Add a <script src='[filename]'></script> node to the document's head.
     * Speicify the filename to use as the src.
     * ex: jsLoader.loadJsFile('scripts/myScript.js');
     * @param filename String
     * @return void
     **/
    function loadFile(filename) {
        jsFileQueue.push(filename);
        loadNextQueuedFile();
    };

    /**
     * We'll load scripts synchronously.  We'll keep track of our queue here.
     **/
    var jsFileQueue = [];
    /**
     * Keep track of our ready-state.
     **/
    var ready = true;
    /**
     * Internal method.
     * Load the next file from the queue.  (Continue loading until queue is empty.)
     **/
    function loadNextQueuedFile() {
        if (ready && jsFileQueue.length > 0) {
            ready = false;

            var s = document.createElement('script'),
                self = this;
            s.src = jsFileQueue.shift();
            s.async = true;
            s.onreadystatechange = s.onload = function() {
                ready = true;
                if (jsFileQueue.length === 0) {
                    var event = new Event('RlLoaderFinished');
                    // Listen for the event.
                    document.dispatchEvent(event);
                } else {
                    loadNextQueuedFile();
                }
            }
            document.getElementsByTagName('head')[0].appendChild(s);
        }
    }

    /**
     * Get an array of scripts from any HTTP location.  Load said scripts
     * on the page.
     * Example:
     * Assuming you have a file called myScripts.json that contains a JSON array
     * ["file1.js", "scripts/file2.js"]
     * jsLoader.loadJsFilesFromConfig('myScripts.json');
     * @param url String
     * @return void
     **/
    function loadFilesFromConfig(url) {
        var httpcli = new XMLHttpRequest();

        httpcli.onreadystatechange = function () {
            if (httpcli.readyState === 4 && httpcli.status === 200) {
                try {
                    var scriptArray = JSON.parse(httpcli.responseText);
                    for (var i = 0; i < scriptArray.length; i++) {
                        var scriptFile = scriptArray[i];
                        loadFile(scriptFile);
                    }
                } catch(error) {
                    console.error("Could not load JS files from: " + url);
                    console.error(error);
                    throw(error);
                }

            }
        }

        httpcli.open('GET', url, true);
        httpcli.send();
    }

    // Load the vendor files
    loadFilesFromConfig('bower_files.json');

    // Load the user's files
    loadFilesFromConfig('.project_files.json');
})();
