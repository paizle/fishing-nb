export default function createResource(asyncFn) {
	let status = 'pending'
	let result
	let suspender = asyncFn().then(
		(res) => {
			status = 'success'
			result = res
		},
		(err) => {
			status = 'error'
			result = err
		},
	)

	return {
		read() {
			if (status === 'pending') throw suspender // ⏳ Suspends rendering
			if (status === 'error') throw result // ❌ Throw error if failed
			return result // ✅ Return data when ready
		},
	}
}
