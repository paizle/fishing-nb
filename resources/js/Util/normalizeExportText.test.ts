import { describe, expect, it } from 'vitest'
import { normalizeExportText } from './normalizeExportText'

describe('normalizeExportText', () => {
	it('converts degree mojibake between digits', () => {
		expect(normalizeExportText('47??44\'38.59"N 65??53\'24.22"W')).toBe(
			'47°44\'38.59"N 65°53\'24.22"W',
		)
	})

	it('converts accented name mojibake', () => {
		expect(normalizeExportText('including Hach?? Pool')).toBe('including Haché Pool')
	})

	it('preserves existing degree symbol', () => {
		const raw = '47°27\'46.2"N 64°56\'01.9"W'
		expect(normalizeExportText(raw)).toBe(raw)
	})

	it('returns null for empty input', () => {
		expect(normalizeExportText(null)).toBeNull()
		expect(normalizeExportText('   ')).toBeNull()
	})
})
