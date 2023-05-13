import React from 'react'
import renderer, { act } from 'react-test-renderer'

import { LaunchItem } from '../../app/components/LaunchItem'

const mockNavigation = { navigate: jest.fn() }
jest.mock('@react-navigation/native', () => ({
	useNavigation: () => mockNavigation,
}))

describe('LaunchItem', () => {
	let launch, launchItem, launchItemInstance, pressable

	beforeEach(() => {
		launch = {
			id: 'test-id',
			mission_name: 'Test Mission Name',
			launch_date_local: new Date('2023-03-28T22:00:00Z'),
			rocket: {
				rocket: {
					id: 'test-rocket-id',
					name: 'Test Rocket Name',
					active: true,
				},
			},
		}
		launchItem = renderer.create(<LaunchItem item={launch} />)
		launchItemInstance = launchItem.root
		pressable = launchItemInstance.findByProps({ testID: 'test-id' })
	})

	it('renders correctly', () => {
		const tree = launchItem.toJSON()

		expect(tree).toMatchSnapshot()
	})

	it('calls navigate with the correct arguments when pressed', () => {
		act(() => {
			pressable.props.onPress()
		})

		expect(mockNavigation.navigate).toHaveBeenCalledWith('LaunchDetails', {
			launchId: launch.id,
		})
	})
})
