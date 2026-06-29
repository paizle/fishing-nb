export default function getFishImageSrc(fishName) {
	// Slug logic mirrored in App\Support\FishImageUrl::fromName()
	return '/images/fish/' + fishName.toLowerCase().replaceAll(' ', '-') + '.png'
}
