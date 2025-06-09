export default function indexBy(key, arrayOfObjects) {
	return arrayOfObjects.reduce((a, v, i) => {
		a[v[key]] = v
		return a
	}, {})
}
