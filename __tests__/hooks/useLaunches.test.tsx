import { renderHook } from '@testing-library/react-hooks'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'

import { useLaunches } from '../../app/hooks/useLaunches'
import { GET_OLDEST_LAUNCHES } from '../../app/queries/getOldestLaunches'

describe('useLaunches', () => {
	const launches = [
		{
			id: 1,
			mission_name: 'Mission 1',
			launch_date_local: '2022-01-01',
			rocket: { rocket: { id: 1, name: 'Rocket 1', active: true } },
		},
		{
			id: 2,
			mission_name: 'Mission 2',
			launch_date_local: '2022-01-02',
			rocket: { rocket: { id: 2, name: 'Rocket 2', active: false } },
		},
		{
			id: 3,
			mission_name: 'Mission 3',
			launch_date_local: '2022-01-03',
			rocket: { rocket: { id: 3, name: 'Rocket 3', active: true } },
		},
	]

	const mockLaunchesQuery: MockedResponse = {
		request: {
			query: GET_OLDEST_LAUNCHES,
			variables: {
				offset: 0,
				limit: 20,
			},
		},
		result: {
			data: {
				launchesPast: launches,
			},
		},
	}

	const mockUseQuery = (mocks: MockedResponse[]) => {
		return renderHook(() => useLaunches(), {
			wrapper: ({ children }: { children: unknown }) => (
				<MockedProvider mocks={mocks} addTypename={false}>
					{children}
				</MockedProvider>
			),
		})
	}

	it('should render launches', async () => {
		const { result, waitForNextUpdate } = mockUseQuery([
			mockLaunchesQuery,
			{
				request: {
					query: GET_OLDEST_LAUNCHES,
					variables: {
						offset: 0,
						limit: 20,
					},
				},
				result: {
					data: {
						launchesPast: launches,
					},
				},
			},
		])

		expect(result.current.loadingLaunches).toBe(true)
		expect(result.current.launches).toEqual([])
		expect(result.current.moreResults).toBe(true)

		await waitForNextUpdate()

		expect(result.current.loadingLaunches).toBe(false)
		expect(result.current.launches).toEqual(launches)
	})

	it('should render filtered launches', async () => {
		const mockUseQuery = (mocks: MockedResponse[]) => {
			return renderHook(() => useLaunches('Mission 3'), {
				wrapper: ({ children }: { children: unknown }) => (
					<MockedProvider mocks={mocks} addTypename={false}>
						{children}
					</MockedProvider>
				),
			})
		}

		const { result, waitForNextUpdate } = mockUseQuery([
			mockLaunchesQuery,
			{
				request: {
					query: GET_OLDEST_LAUNCHES,
					variables: {
						offset: 0,
						limit: 20,
					},
				},
				result: {
					data: {
						launchesPast: launches,
					},
				},
			},
		])

		expect(result.current.loadingLaunches).toBe(true)
		expect(result.current.launches).toEqual([])

		await waitForNextUpdate()

		expect(result.current.loadingLaunches).toBe(false)
		expect(result.current.launches).toEqual([launches[2]])
	})
})
