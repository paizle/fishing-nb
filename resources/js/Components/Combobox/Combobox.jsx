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
			}) => (
				<div
					ref={ref}
					className={`Combobox ${isInit ? 'init' : ''} ${hasFocus ? 'open' : ''}`}
				>
					<label {...getLabelProps()}>
						{label}
						<div
							className="input-wrapper"
							{...getRootProps({}, { suppressRefError: true })}
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
						{items.length && hasFocus
							? items
									.filter(
										(item) =>
											!inputValue ||
											(item?.label || item.value)
												.toLowerCase()
												.includes(
													inputValue.toLowerCase(),
												),
									)
									.map((item, index) => (
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
							: null}
					</ul>
				</div>
			)}
		</Downshift>
	)
}
