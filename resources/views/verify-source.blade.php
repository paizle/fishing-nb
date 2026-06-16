<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>{{ $description }}</title>
	<style>
		:root {
			--header-height: 4rem;
		}

		html, body {
			margin: 0;
			height: 100%;
			font-family: system-ui, -apple-system, sans-serif;
			color: #1a1a1a;
		}

		.verify-header {
			box-sizing: border-box;
			min-height: var(--header-height);
			padding: 1rem 1.25rem;
			border-bottom: 1px solid #d4d4d4;
			background: #f8fafc;
		}

		.verify-header p {
			margin: 0;
			font-size: 1rem;
			line-height: 1.4;
			font-weight: 400;
		}

		.verify-pdf {
			display: block;
			width: 100%;
			height: calc(100vh - var(--header-height));
			border: 0;
		}

		.verify-pdf-canvas-wrap {
			box-sizing: border-box;
			width: 100%;
			height: calc(100vh - var(--header-height));
			overflow: auto;
			background: #525659;
			padding: 0.5rem;
		}

		.verify-pdf-canvas-wrap canvas {
			display: block;
			margin: 0 auto;
			max-width: 100%;
			height: auto;
			background: #fff;
		}

		.verify-pdf-status {
			margin: 1rem;
			color: #475569;
		}

		.verify-pdf-status--error {
			color: #b91c1c;
		}
	</style>
</head>
<body>
	<header class="verify-header">
		<p>{{ $description }}</p>
	</header>

	@if ($usePdfJs)
		<div class="verify-pdf-canvas-wrap" id="pdf-viewport">
			<p class="verify-pdf-status" id="pdf-status">Loading document…</p>
		</div>
		<script type="module">
			import * as pdfjsLib from '{{ asset('pdfjs/pdf.mjs') }}';

			pdfjsLib.GlobalWorkerOptions.workerSrc = @json(asset('pdfjs/pdf.worker.mjs'));

			const viewport = document.getElementById('pdf-viewport');
			const status = document.getElementById('pdf-status');
			const pdfUrl = @json($pdfBaseUrl);
			const pageNumber = {{ $pdfPage }};

			try {
				const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
				const page = await pdf.getPage(pageNumber);
				const baseViewport = page.getViewport({ scale: 1 });
				const scale = Math.min(
					(viewport.clientWidth - 16) / baseViewport.width,
					2,
				);
				const scaledViewport = page.getViewport({ scale: Math.max(scale, 0.5) });
				const canvas = document.createElement('canvas');
				canvas.width = scaledViewport.width;
				canvas.height = scaledViewport.height;

				status.remove();
				viewport.appendChild(canvas);

				await page.render({
					canvasContext: canvas.getContext('2d'),
					viewport: scaledViewport,
				}).promise;
			} catch (error) {
				status.textContent = 'Unable to display this page. Open the PDF directly instead.';
				status.classList.add('verify-pdf-status--error');
				console.error(error);
			}
		</script>
	@else
		<iframe class="verify-pdf" src="{{ $pdfUrl }}" title="{{ $description }}"></iframe>
	@endif
</body>
</html>
