<?php

namespace App\Support;

use App\Models\SeasonStatusDaily;
use App\Models\SeasonStatusDaily\SeasonStatus;

class SeasonStatusEntryBuilder
{
	public function __construct(private readonly SeasonMethodContext $methodContext) {}

	/**
	 * @return array{
	 *     fishId: int,
	 *     fishName: string,
	 *     status: string,
	 *     statusLabel: string,
	 *     statusClass: string
	 * }
	 */
	public function fromDailyRow(SeasonStatusDaily $row): array
	{
		$status = $row->status;
		$methodLabel = $this->methodContext->methodLabelFor(
			(int) $row->fish_id,
			$row->calendar_date,
			$status,
		);

		$statusLabel = $status->label();
		if ($methodLabel !== null && $status !== SeasonStatus::CLOSED) {
			$statusLabel = $methodLabel;
		}

		return [
			'fishId' => (int) $row->fish_id,
			'fishName' => (string) $row->fish->name,
			'status' => $status->value,
			'statusLabel' => $statusLabel,
			'statusClass' => $status->cssClass(),
		];
	}
}
