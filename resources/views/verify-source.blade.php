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
	</style>
</head>
<body>
	<header class="verify-header">
		<p>{{ $description }}</p>
	</header>
	<iframe class="verify-pdf" src="{{ $pdfUrl }}" title="{{ $description }}"></iframe>
</body>
</html>
