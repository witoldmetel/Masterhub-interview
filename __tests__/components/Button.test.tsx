import React from 'react'
import { Pressable } from 'react-native'
import renderer, { act } from 'react-test-renderer'

import { Button } from '../../app/components/Button'

describe('Button component', () => {
	let onPressMock
	let component

	beforeEach(() => {
		onPressMock = jest.fn()
		component = renderer.create(<Button title="Test Button" onPress={onPressMock} />)
	})

	it('renders correctly with title', () => {
		const tree = component.toJSON()

		expect(tree).toMatchSnapshot()
	})

	it('calls onPress handler when button is pressed', () => {
		const button = component.root.findByType(Pressable)

		act(() => {
			button.props.onPress()
		})

		expect(onPressMock).toHaveBeenCalledTimes(1)
	})

	it('renders correctly when disabled', () => {
		const disabledComponent = renderer.create(<Button title="Test Button" onPress={() => {}} disabled />)
		const tree = disabledComponent.toJSON()

		expect(tree).toMatchSnapshot()
	})
})
