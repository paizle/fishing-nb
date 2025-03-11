<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Fish\FishCategory;

class Fish extends Model
{
    use HasFactory;

		protected $casts = [
			'fish_category' => FishCategory::class
		];
    protected $fillable = ['name', 'fish_category'];
}
