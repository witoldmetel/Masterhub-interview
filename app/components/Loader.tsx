import React from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'

export function Loader() {
	return (
		<View style={styles.loadingContainer} testID="loader">
			<Text style={styles.loadingTitle}>Loading...</Text>
			<ActivityIndicator size="large" color="#ff4e2b" />
		</View>
	)
}

const styles = StyleSheet.create({
	loadingContainer: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	loadingTitle: { color: '#fff', fontSize: 24, fontWeight: '500', marginBottom: 12 },
})
