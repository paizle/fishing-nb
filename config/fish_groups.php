<?php

$path = resource_path('js/data/fish_groups.json');

if (!is_readable($path)) {
	throw new RuntimeException("Fish groups config not found: {$path}");
}

return json_decode((string) file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);
