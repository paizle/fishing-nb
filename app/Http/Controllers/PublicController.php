<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Support\VerifySourcePdfViewer;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PublicController extends Controller
{
	public function regulationPdf(): BinaryFileResponse
	{
		$path = $this->regulationPdfPath();

		return response()->file($path, [
			'Content-Type' => 'application/pdf',
			'Content-Disposition' => 'inline; filename="Fish.pdf"',
		]);
	}

	private function regulationPdfPath(): string
	{
		$candidates = [
			storage_path('app/regulations/Fish.pdf'),
			public_path('regulations/Fish.pdf'),
		];

		foreach ($candidates as $path) {
			if (is_file($path)) {
				return $path;
			}
		}

		abort(404);
	}

	public function waters_map()
	{
		return Inertia::render('Public/WatersMap/WatersMap', [
			'apiLastModified' => config('app.api_last_modified'),
		]);
	}

	public function settings()
	{
		return Inertia::render('Public/Settings/Settings', [
			'settings' => [],
		]);
	}

	public function verifySource(Request $request)
	{
		$page = (int) $request->query('page', 0);
		$table = trim((string) $request->query('table', ''));
		$row = trim((string) $request->query('row', ''));
		$location = trim((string) $request->query('location', ''));

		if ($table === '' && $location !== '') {
			$separators = [" — ", " ??? ", " - "];
			$table = $location;
			$row = '';
			$separatorIndex = -1;
			$separatorLength = 0;

			foreach ($separators as $separator) {
				$index = strrpos($location, $separator);
				if ($index !== false && $index > $separatorIndex) {
					$separatorIndex = $index;
					$separatorLength = strlen($separator);
				}
			}

			if ($separatorIndex >= 0) {
				$table = trim(substr($location, 0, $separatorIndex));
				$row = trim(substr($location, $separatorIndex + $separatorLength));
			}
		}

		if ($page < 1 || $table === '') {
			abort(404);
		}

		$region = trim((string) $request->query('region', ''));
		$displayPage = $page - 2;
		$section = $row !== '' ? "{$table} - {$row}" : $table;
		$descriptionParts = ["Page {$displayPage}"];
		if ($region !== '') {
			$descriptionParts[] = $region;
		}
		$descriptionParts[] = $section;
		$description = implode(' - ', $descriptionParts);

		return view('verify-source', [
			'title' => $description,
			'description' => $description,
			'pdfUrl' => url("/regulations/Fish.pdf#page={$page}"),
			'pdfBaseUrl' => url('/regulations/Fish.pdf'),
			'pdfPage' => $page,
			'usePdfJs' => VerifySourcePdfViewer::needsPdfJs($request->userAgent()),
		]);
	}
}
