import './Combobox.scss'
import Downshift from 'downshift'
import { useState, useRef, useEffect, useLayoutEffect } from 'react'

export default function Combobox({
	items = [],
	label,
	placeholder = null,
	onChange,
	onFocus,
}) {
	const ref = useRef(null)

	const [isInit, setIsInit] = useState(false)

	useEffect(() => {
		if (ref.current) {
			setTimeout(() => {
				setIsInit(true)
			}, 0)
		}
	}, [ref.current])

	const [hasFocus, setHasFocus] = useState(false)

	const handleFocus = (e) => {
		setHasFocus(false)
		if (onFocus) {
			onFocus(e)
		}
		setTimeout(() => setHasFocus(true), 1)
	}

	const handleBlur = (e) => {
		setHasFocus(false)
	}

	const handleChange = (selection) => {
		console.log(selection)
		if (onChange) {
			onChange(selection)
		}
	}

	return (
		<Downshift
			onChange={handleChange}
			itemToString={(item) => (item ? item?.label || item.value : '')}
		>
			{({
				getInputProps,
				getItemProps,
				getLabelProps,
				getMenuProps,
				isOpen,
				inputValue,
				highlightedIndex,
				selectedItem,
				getRootProps,
			}) => {
				const filterByText = (item) => {
					if (!inputValue) return true
					const inputChunks = inputValue
						.split(' ')
						.map((chunk) => chunk.toLowerCase())
					const labelChunks = item.label
						.split(' ')
						.map((chunk) => chunk.toLowerCase())
					return inputChunks.every((inputChunk) =>
						labelChunks.some((labelChunk) =>
							labelChunk.includes(inputChunk),
						),
					)
				}
				const filteredItems = items.filter(filterByText)
				return (
					<div
						ref={ref}
						className={`Combobox ${isInit ? 'init' : ''} ${hasFocus ? 'open' : ''}`}
					>
						<label {...getLabelProps()}>
							{label}
							<div
								className="input-wrapper"
								{...getRootProps(
									{},
									{ suppressRefError: true },
								)}
							>
								<input
									{...getInputProps()}
									placeholder={placeholder}
									onFocus={handleFocus}
									onClick={handleFocus}
									onBlur={handleBlur}
								/>
							</div>
						</label>
						<ul
							className={`results ${hasFocus ? 'open' : ''}`}
							{...getMenuProps()}
						>
							{filteredItems.length && hasFocus ? (
								filteredItems.map((item, index) => (
									<li
										key={item?.label || item.value}
										className={`item ${highlightedIndex === index ? 'highlighted' : ''}`}
										{...getItemProps({
											index,
											item,
											style: {
												fontWeight:
													selectedItem === item
														? 'bold'
														: 'normal',
											},
										})}
									>
										{item?.label || item.value}
									</li>
								))
							) : (
								<li className="item">(no results)</li>
							)}
						</ul>
					</div>
				)
			}}
		</Downshift>
	)
}
