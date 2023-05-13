import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import renderer, { act } from 'react-test-renderer'
import { waitFor } from '@testing-library/react-native'

import { LaunchList } from '../../app/components/LaunchList'
import { useLaunches } from '../../app/hooks/useLaunches'

jest.mock('../../app/hooks/useLaunches', () => {
	const useLaunchesMock = jest.fn().mockReturnValue({
		launches: [
			{
				id: 'test-id-1',
				mission_name: 'Test Mission 1',
				launch_date_local: new Date('2023-03-27T22:00:00Z'),
				rocket: {
					rocket: {
						id: 'test-rocket-id-1',
						name: 'Test Rocket 1',
						active: true,
					},
				},
			},
			{
				id: 'test-id-2',
				mission_name: 'Test Mission 2',
				launch_date_local: new Date('2023-03-28T22:00:00Z'),
				rocket: {
					rocket: {
						id: 'test-rocket-id-2',
						name: 'Test Rocket 2',
						active: true,
					},
				},
			},
		],
		loadingLaunches: false,
		moreResults: true,
		handleLoadMore: jest.fn(),
	})

	return {
		useLaunches: useLaunchesMock,
	}
})

describe('LaunchList', () => {
	let launchList

	beforeAll(() => {
		launchList = renderer.create(
			<NavigationContainer>
				<LaunchList searchQuery="test" />
			</NavigationContainer>,
		)
	})

	it('renders the list of launches and load more button when there are results', async () => {
		const launchListInstance = launchList.root

		await waitFor(() => {
			// Check that the FlatList is rendered with the correct props
			const flatList = launchListInstance.findByProps({ testID: 'flatlist' })

			expect(flatList.props.data.length).toBe(2)
			expect(flatList.props.renderItem({ item: flatList.props.data[0] })).toBeTruthy()
			expect(flatList.props.keyExtractor(flatList.props.data[0])).toBe('test-id-1')

			// Check that the Load More button is rendered with the correct props
			const loadMoreButton = launchListInstance.findByProps({ testID: 'loadmore' })

			expect(loadMoreButton.props.title).toBe('Load More')
			expect(loadMoreButton.props.disabled).toBeFalsy()

			// Trigger the onPress event of the Load More button
			act(() => {
				loadMoreButton.props.onPress()
			})
		})

		await waitFor(() => {
			// Check that the handleLoadMore function is called
			expect(useLaunches().handleLoadMore).toHaveBeenCalledTimes(1)
		})
	})

	it('renders the "No results" message when there are no launches', async () => {
		launchList.update(
			<NavigationContainer>
				<LaunchList searchQuery="No results" />
			</NavigationContainer>,
		)

		const launchListInstance = launchList.root

		await waitFor(() => {
			// Check that the "No results" message is rendered
			expect(launchListInstance.props.data).toBeFalsy()
			expect(launchListInstance.props.children.props.searchQuery).toBe('No results')
		})
	})

	it('renders the loader when loading launches', async () => {
		const useLaunchesMock = useLaunches as jest.MockedFunction<typeof useLaunches>

		useLaunchesMock.mockReturnValueOnce({
			launches: [],
			loadingLaunches: true,
			moreResults: false,
			handleLoadMore: jest.fn(),
			errorLaunches: undefined,
			refetch: jest.fn(),
		})

		launchList.update(
			<NavigationContainer>
				<LaunchList searchQuery="" />
			</NavigationContainer>,
		)

		const launchListInstance = launchList.root

		// Check that the loader is rendered when loading launches
		expect(launchListInstance.findByProps({ testID: 'loader' })).toBeTruthy()
	})
})
