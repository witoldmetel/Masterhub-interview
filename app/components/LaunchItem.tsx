import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'

import { LaunchType } from '../types'
import { LaunchDetailsScreenNavigationProp } from '../navigators/types'

type LaunchItemProps = {
	item: LaunchType
}

export const LaunchItem = ({ item }: LaunchItemProps) => {
	const navigation = useNavigation<LaunchDetailsScreenNavigationProp>()

	const onItemPress = (itemId: string) => {
		navigation.navigate('LaunchDetails', {
			launchId: itemId,
		})
	}

	return (
		<Pressable
			style={({ pressed }) => [styles.launchItem, { opacity: pressed ? 0.75 : 1 }]}
			onPress={() => onItemPress(item.id)}
			testID={item.id}>
			<Text style={styles.launchDate}>{format(new Date(item.launch_date_local), 'MMMM dd, yyyy')}</Text>
			<Text style={styles.launchMissionName}>{item.mission_name}</Text>
			<View
				style={[
					styles.launchRocketNameWrapper,
					{ backgroundColor: item.rocket.rocket.active ? '#38373c' : '#ff4e2b' },
				]}>
				<Text style={[styles.launchRocketName, { color: item.rocket.rocket.active ? '#fff' : '#1c1c1e' }]}>
					{item.rocket.rocket.name}
				</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	launchDate: { color: '#ff4e2b', fontSize: 16, fontWeight: '500' },
	launchItem: {
		backgroundColor: '#1c1c1e',
		borderRadius: 16,
		borderWidth: 1,
		padding: 16,
	},
	launchMissionName: { color: '#fff', fontSize: 20, fontWeight: '500', marginVertical: 8 },
	launchRocketName: { color: '#fff', fontSize: 14, fontWeight: '500' },
	launchRocketNameWrapper: {
		alignSelf: 'flex-start',
		backgroundColor: '#38373c',
		borderRadius: 8,
		padding: 6,
	},
})
