
var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.


// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

var loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(
	function (pdf) {
		// Load information from the first page.
		pdf.getPage(1).then(function (page) {
			var scale = 1;
			var viewport = page.getViewport(scale);

			// Apply page dimensions to the `<canvas>` element.
			var canvas = document.getElementById('pdf');
			var context = canvas.getContext('2d');
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			// Render the page into the `<canvas>` element.
			var renderContext = {
				canvasContext: context,
				viewport: viewport,
			};
			page.render(renderContext);
		});
	},
	function (reason) {
		console.error(reason);
	},
);