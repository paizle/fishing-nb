export default function getFishImage(fishName) {
    return '/images/fish/' + fishName.toLowerCase().replaceAll(' ', '-') + '.png'
}