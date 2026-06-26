<?php

namespace App\Http\Controllers;

use App\Services\SeasonCalendarService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CalendarApiController extends Controller
{
	public function __construct(protected SeasonCalendarService $calendar)
	{
	}

	public function index(Request $request): JsonResponse
	{
		return response()->json(
			$this->calendar->getMonth($request->query('date')),
		);
	}
}
