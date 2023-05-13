import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'

import { Button } from '../components/Button'
import { LaunchList } from '../components/LaunchList'
import { ScreenWrapper } from '../components/ScreenWrapper'
import { useLaunches } from '../hooks/useLaunches'

const HomeScreen = () => {
	const { errorLaunches, refetch } = useLaunches()

	const [searchQuery, setSearchQuery] = useState<string>('')

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<Text style={styles.title}>Launches</Text>
				<View style={styles.searchContainer}>
					<TextInput
						placeholder="Search launch by mission name"
						placeholderTextColor="#79797b"
						style={styles.searchInput}
						onChangeText={setSearchQuery}
						editable={Boolean(!errorLaunches)}
						selectTextOnFocus={false}
					/>
				</View>
				{!errorLaunches ? (
					<LaunchList searchQuery={searchQuery} />
				) : (
					<>
						<View style={styles.errorContainer}>
							<Text style={styles.errorText}>Something went wrong</Text>
						</View>
						<Button title="Retry" onPress={() => refetch()} />
					</>
				)}
			</View>
		</ScreenWrapper>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	errorContainer: {
		alignItems: 'center',
		backgroundColor: '#ffc0ce',
		borderRadius: 16,
		borderWidth: 1,
		justifyContent: 'center',
		padding: 16,
	},
	errorText: {
		color: '#93334a',
		fontSize: 24,
		fontWeight: '500',
	},
	searchContainer: {
		backgroundColor: '#1c1c1e',
		marginVertical: 16,
	},
	searchInput: {
		borderRadius: 12,
		color: '#79797b',
		height: 48,
		padding: 8,
		width: '100%',
	},
	title: {
		color: '#fff',
		fontSize: 32,
		fontWeight: '600',
	},
})

export default HomeScreen
