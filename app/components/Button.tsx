import React from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'

type ButtonProps = {
	title: string
	disabled?: boolean
	testID?: string

	onPress: () => void
}

export function Button({ onPress, title, disabled, testID }: ButtonProps) {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				{ backgroundColor: disabled ? '#333' : '#ff4e2b', opacity: pressed ? 0.65 : 1 },
			]}
			onPress={onPress}
			disabled={disabled}
			testID={testID}>
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		borderRadius: 8,
		elevation: 3,
		justifyContent: 'center',
		marginVertical: 12,
		paddingHorizontal: 32,
		paddingVertical: 12,
	},
	text: {
		color: '#010103',
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		lineHeight: 21,
	},
})
