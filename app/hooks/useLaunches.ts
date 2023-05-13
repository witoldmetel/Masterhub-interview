import { useQuery } from '@apollo/client'
import { useEffect, useMemo, useState } from 'react'

import { LaunchType } from '../types'
import { GET_OLDEST_LAUNCHES } from '../queries/getOldestLaunches'

export const useLaunches = (searchQuery = '') => {
	const [limit, setLimit] = useState<number>(20)
	const [offset, setOffset] = useState<number>(0)
	const [launches, setLaunches] = useState<LaunchType[]>([])
	const [moreResults, setMoreResults] = useState<boolean>(true)

	const { data, loading, error, refetch } = useQuery(GET_OLDEST_LAUNCHES, {
		variables: { limit, offset },
		onCompleted: data => {
			if (data.launchesPast.length > 0) {
				setLaunches(prevLaunches => [...prevLaunches, ...data.launchesPast])
			} else {
				setMoreResults(false)
			}
		},
		notifyOnNetworkStatusChange: true,
	})

	const handleLoadMore = () => {
		setOffset(offset + 20)
		setLimit(limit + 20)
	}

	const filteredLaunches = useMemo(() => {
		if (!searchQuery) return launches

		return launches.filter(({ mission_name }) => mission_name.toLowerCase().includes(searchQuery.toLowerCase()))
	}, [searchQuery, launches])

	useEffect(() => {
		if (!loading && data && 'launchesPast' in data) {
			setLaunches(data.launchesPast)
		}
	}, [])

	return {
		loadingLaunches: loading,
		errorLaunches: error,
		launches: filteredLaunches,
		moreResults,
		handleLoadMore,
		refetch,
	}
}
