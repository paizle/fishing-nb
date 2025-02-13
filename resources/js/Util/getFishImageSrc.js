export default function getFishImageSrc(fishName) {
	return (
		'/images/fish/' + fishName.toLowerCase().replaceAll(' ', '-') + '.png'
	)
}
