import { useState, useEffect } from 'react'

const wizardSteps = [
	{
		name: 'wizard-step-1',
		params: {
			'': {},
		},
	},
	{
		name: 'wizard-step-2',
		params: {
			'': {},
		},
	},
	{
		name: 'wizard-step-3',
		params: {
			'': {},
		},
	},
	{
		name: 'wizard-step-4',
		params: {
			'': {},
		},
	},
]

export const useWizard = () => {
	useEffect(() => {}, [])

	const [wizardState, setWizardState] = useState({
		mapFocus: false,
		comboboxFocus: false,
		comboboxList: false,
	})

	const onDropDownClick = () => {
		console.log('drop down')
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				mapFocus: false,
			}
			return newWizardState
		})
	}

	const onMapClick = () => {
		console.log('map click')
		console.log('not this')
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				mapFocus: true,
			}
			return newWizardState
		})
	}

	const onRegionClick = () => {
		console.log('really?')
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				mapFocus: !oldWizardState.mapFocus,
			}
			return newWizardState
		})
	}

	const onRegionSelected = () => {
		console.log('no idea')
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				mapFocus: false,
			}
			return newWizardState
		})
	}

	const onComboboxInteract = (hasFocus, isOpen) => {
		console.log('combobox interact', { hasFocus }, { isOpen })
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				comboboxFocus: hasFocus,
				comboboxList: isOpen,
			}
			if (hasFocus || isOpen) {
				console.log('unfocus map')
				newWizardState.mapFocus = false
			}
			return newWizardState
		})
	}

	const onComboboxBlur = () => {
		console.log('combobox blur')
		setWizardState((oldWizardState) => {
			const newWizardState = { ...oldWizardState, comboboxFocus: false, comboboxList: false }
			return newWizardState
		})
	}

	const setHasLocation = (hasLocation) => {
		setWizardState((oldWizardState) => {
			const newWizardState = {
				...oldWizardState,
				hasLocation,
			}
			return newWizardState
		})
	}

	const getWizardStep = () => {
		let step

		if (wizardState.mapFocus) {
			step = wizardSteps[0]
		} else if (wizardState.comboboxList) {
			step = wizardSteps[2]
		} else if (wizardState.hasLocation) {
			step = wizardSteps[3]
		} else if (wizardState.comboboxFocus) {
			step = wizardSteps[2]
		} else {
			step = wizardSteps[1]
		}

		console.log('STATE', step.name, wizardState)

		return step
	}

	return {
		wizardState,
		onMapClick,
		onRegionClick,
		onRegionSelected,
		onComboboxInteract,
		onComboboxBlur,
		onDropDownClick,
		setHasLocation,
		wizardSteps,
		getWizardStep,
	}
}

export default useWizard
