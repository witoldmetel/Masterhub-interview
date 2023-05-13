import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type ScreenWrapperProps = {
	children?: React.ReactNode
}

export const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
	return (
		<SafeAreaView style={styles.rootContainer} edges={['top']} testID="root-container">
			{children}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	rootContainer: {
		backgroundColor: '#010103',
		flex: 1,
	},
})
