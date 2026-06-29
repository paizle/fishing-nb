<?php

namespace App\View\Components;

use Illuminate\View\Component;
use InvalidArgumentException;

class UiIcon extends Component
{
	public function __construct(public string $name)
	{
	}

	public function render()
	{
		$path = resource_path("icons/heroicons/24/outline/{$this->name}.svg");

		if (! is_file($path)) {
			throw new InvalidArgumentException("Unknown icon: {$this->name}");
		}

		return view('components.ui-icon', [
			'svgMarkup' => file_get_contents($path),
		]);
	}
}
