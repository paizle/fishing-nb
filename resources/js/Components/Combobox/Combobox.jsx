import './Combobox.scss'
import Downshift, { useCombobox } from 'downshift'
import { useState, useRef, useEffect, useLayoutEffect, use } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

const filterByText = (item, inputValue) => {
	if (!inputValue) return true
	const inputChunks = inputValue.split(' ').map((chunk) => chunk.toLowerCase())
	const labelChunks = item.label.split(' ').map((chunk) => chunk.toLowerCase())
	return inputChunks.every((inputChunk) =>
		labelChunks.some((labelChunk) => labelChunk.includes(inputChunk)),
	)
}

export default function Combobox({ className = '', placeholder, inputRef, items = [], onChange }) {
	const [inputValue, setInputValue] = useState('')

	const ref = inputRef ? inputRef : useRef(null)

	const filteredItems = (items ?? []).filter((item) => filterByText(item, inputValue))

	const {
		isOpen,
		getLabelProps,
		getMenuProps,
		getInputProps,
		highlightedIndex,
		getItemProps,
		selectedItem,
		stateChangeTypes,
	} = useCombobox({
		inputValue,
		items: filteredItems,
		itemToString(item) {
			return item ? item.label : ''
		},
		onInputValueChange(e) {
			const { stateChangeTypes } = useCombobox
			console.log(e.type === stateChangeTypes.ItemClick)
			if (
				e.type === stateChangeTypes.ItemClick ||
				e.type === stateChangeTypes.InputKeyDownEnter
			) {
				onChange(e.selectedItem)
			} else {
				console.log(e)
				setInputValue(e.inputValue)
			}
		},
	})

	const clearSearch = () => {
		setInputValue('')
	}

	const onFocus = (e) => {
		const target = e.target
		const combobox = target.closest('.Combobox')
		combobox.addEventListener(
			'transitionstart',
			() =>
				combobox.addEventListener(
					'transitionend',
					() =>
						target.parentElement?.scrollIntoView({
							behavior: 'smooth',
							block: 'start',
						}),
					{ once: true },
				),
			{ once: true },
		)
	}

	return (
		<div className={`Combobox ${className ? className : ''}`}>
			<div className="input" {...getLabelProps()}>
				<input
					placeholder={placeholder}
					value={inputValue}
					{...getInputProps({ ref })}
					onFocus={onFocus}
				/>
				<button aria-label="Clear Search input" type="button" onClick={clearSearch}>
					<XCircleIcon />
				</button>
			</div>

			<ul className={isOpen ? 'open' : ''} {...getMenuProps()}>
				{isOpen &&
					filteredItems.map((item, index) => (
						<li
							className={`${selectedItem === item ? 'selected' : ''} ${index === highlightedIndex ? 'highlighted' : ''}`}
							key={item.value.regionId + '-' + item.value.waterId}
							{...getItemProps({ item, index })}
						>
							<span>{item.label}</span>
						</li>
					))}
			</ul>
		</div>
	)
}
