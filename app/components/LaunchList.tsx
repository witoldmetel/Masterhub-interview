import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'

import { useLaunches } from '../hooks/useLaunches'
import { LaunchItem } from './LaunchItem'
import { Button } from './Button'
import { Loader } from './Loader'

type LaunchListProps = {
	searchQuery: string
}

export const LaunchList = ({ searchQuery }: LaunchListProps) => {
	const { launches, loadingLaunches, moreResults, handleLoadMore } = useLaunches(searchQuery)

	if (loadingLaunches) {
		return <Loader />
	}

	return (
		<>
			<FlatList
				data={launches}
				renderItem={({ item }) => <LaunchItem item={item} />}
				keyExtractor={item => item.id}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				ListEmptyComponent={
					<View style={styles.emptyContainer} testID="empty">
						<Text style={styles.emptyContainerText}>No results</Text>
					</View>
				}
				testID="flatlist"
			/>
			{moreResults ? (
				<Button onPress={handleLoadMore} title="Load More" disabled={loadingLaunches} testID="loadmore" />
			) : null}
		</>
	)
}

const styles = StyleSheet.create({
	emptyContainer: {
		alignItems: 'center',
		backgroundColor: '#f9c7a4',
		borderRadius: 16,
		borderWidth: 1,
		justifyContent: 'center',
		padding: 16,
	},
	emptyContainerText: {
		color: '#a1673f',
		fontSize: 24,
		fontWeight: '500',
	},
	separator: {
		height: 12,
	},
})
