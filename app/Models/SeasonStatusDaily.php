<?php

namespace App\Models;

use App\Models\SeasonStatusDaily\SeasonStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SeasonStatusDaily extends Model
{
	protected $table = 'season_status_daily';

	protected $casts = [
		'regulation_year' => 'integer',
		'calendar_date' => 'date',
		'status' => SeasonStatus::class,
		'sort_order' => 'integer',
	];

	protected $fillable = [
		'regulation_year',
		'calendar_date',
		'fish_id',
		'status',
		'sort_order',
	];

	public function fish(): BelongsTo
	{
		return $this->belongsTo(Fish::class);
	}
}
