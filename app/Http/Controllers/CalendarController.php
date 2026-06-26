<?php

namespace App\Http\Controllers;

use App\Services\SeasonCalendarService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class CalendarController extends Controller
{
	public function __construct(protected SeasonCalendarService $calendar)
	{
	}

	public function index(Request $request): View
	{
		$calendar = $this->calendar->getMonth($request->query('date'));

		return view('pages.calendar', [
			'title' => 'Season status — ' . $calendar['monthLabel'],
			'metaDescription' => 'Province-wide fishing season status by day for New Brunswick regulation year ' . $calendar['regulationYear'] . '.',
			'calendar' => $calendar,
		]);
	}
}
