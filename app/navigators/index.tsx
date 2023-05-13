import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import LaunchDetailsScreen from '../screens/LaunchDetailsScreen'
import { RootParamList } from './types'

const { Navigator, Screen } = createStackNavigator<RootParamList>()

export const RootNavigator = () => (
	<NavigationContainer>
		<Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
			<Screen name="Home" component={HomeScreen} />
			<Screen name="LaunchDetails" component={LaunchDetailsScreen} />
		</Navigator>
	</NavigationContainer>
)
