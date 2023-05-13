import React from 'react'
import { Text, View, StyleSheet, Linking, Pressable, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { ScreenWrapper } from '../components/ScreenWrapper'
import { Loader } from '../components/Loader'
import { LaunchImageWrapper } from '../components/LaunchImageWrapper'
import { Button } from '../components/Button'
import { LaunchDetailsScreenNavigationProp, LaunchDetailsScreenRouteProp } from '../navigators/types'
import { GET_LAUNCH_DETAILS } from '../queries/getLaunchDetails'
import { SpecificLaunchData } from '../types'

const LaunchDetailsScreen = () => {
	const navigation = useNavigation<LaunchDetailsScreenNavigationProp>()
	const route = useRoute<LaunchDetailsScreenRouteProp>()

	const launchId = route?.params?.launchId ?? ''

	const { loading, error, data, refetch } = useQuery<SpecificLaunchData, { id: string }>(GET_LAUNCH_DETAILS, {
		variables: { id: launchId },
	})

	return (
		<ScreenWrapper>
			{loading ? (
				<Loader />
			) : (
				<View style={styles.container}>
					<View style={styles.topSectionContainer}>
						<View style={{ flex: 1 }} />
						<Pressable
							style={({ pressed }) => [styles.closeButton, { opacity: pressed ? 0.65 : 1 }]}
							onPress={navigation.goBack}>
							<Text style={styles.closeIcon}>
								<AntDesignIcon name="close" size={20} color="#2c2e2f" />
							</Text>
						</Pressable>
					</View>
					{!error && launchId && data ? (
						<>
							<View style={styles.contentSection}>
								<Text style={styles.missionNameText}>{data.launch.mission_name}</Text>
								<Text style={styles.missionDateText}>
									{format(new Date(data.launch.launch_date_utc), 'MMMM dd, yyyy')}
								</Text>
								<LaunchImageWrapper links={data?.launch.links} />
								<View style={styles.actionSection}>
									{data.launch.links.wikipedia ? (
										<Text onPress={() => Linking.openURL(data?.launch.links.wikipedia)}>
											<MaterialIcon name="wikipedia" size={42} color="#fff" />
										</Text>
									) : (
										<View style={{ flex: 1 }} />
									)}
									{data?.launch.links.video_link ? (
										<Text onPress={() => Linking.openURL(data?.launch.links.video_link)}>
											<AntDesignIcon name="youtube" size={42} color="#fff" />
										</Text>
									) : (
										<View style={{ flex: 1 }} />
									)}
								</View>
							</View>
							<View style={styles.bottomSection}>
								<View
									style={[
										styles.missionResultContainer,
										{
											backgroundColor: data.launch.launch_success ? '#d4eadd' : '#ffc0ce',
										},
									]}>
									<Text
										style={[
											styles.missionResultText,
											{
												color: data?.launch.launch_success ? '#5fa178' : '#93334a',
											},
										]}>
										{data?.launch.launch_success ? 'Success' : 'Failed'}
									</Text>
								</View>
								{data?.launch.details ? (
									<ScrollView>
										<Text style={styles.detailsText}>{data?.launch.details}</Text>
									</ScrollView>
								) : (
									<Text style={styles.detailsText}>Missing details</Text>
								)}
							</View>
						</>
					) : (
						<View style={styles.errorContainer}>
							<Text style={styles.errorText}>Something went wrong</Text>
							<Button title="Retry" onPress={() => refetch()} />
						</View>
					)}
				</View>
			)}
		</ScreenWrapper>
	)
}

const styles = StyleSheet.create({
	actionSection: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bottomSection: { backgroundColor: '#1c1e1f', flex: 1, padding: 16 },
	closeButton: {
		alignItems: 'center',
		backgroundColor: '#a4a5a9',
		borderRadius: 32,
		height: 32,
		justifyContent: 'center',
		width: 32,
	},
	closeIcon: {
		fontSize: 16,
		fontWeight: '700',
	},
	container: {
		backgroundColor: '#2c2e2f',
		flex: 1,
	},
	contentSection: {
		flex: 1,
		padding: 16,
		position: 'relative',
	},
	detailsText: {
		color: '#fff',
		fontSize: 18,
	},
	errorContainer: {
		alignItems: 'center',
		backgroundColor: '#ffc0ce',
		borderRadius: 16,
		borderWidth: 1,
		flex: 1,
		justifyContent: 'center',
		margin: 16,
		padding: 16,
	},
	errorText: {
		color: '#93334a',
		fontSize: 24,
		fontWeight: '500',
	},
	missionDateText: {
		color: '#ff4e2b',
		fontSize: 16,
		fontWeight: '600',
		marginTop: 8,
		textAlign: 'center',
	},
	missionNameText: {
		color: '#fff',
		fontSize: 32,
		fontWeight: '700',
		textAlign: 'center',
	},
	missionResultContainer: {
		alignSelf: 'center',
		borderColor: '#fff',
		borderRadius: 8,
		borderWidth: 1,
		justifyContent: 'center',
		marginBottom: 12,
		padding: 8,
		width: 100,
	},
	missionResultText: {
		fontSize: 18,
		textAlign: 'center',
	},
	topSectionContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
		paddingHorizontal: 16,
		paddingTop: 16,
	},
})

export default LaunchDetailsScreen
