import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

export type RootParamList = {
	Home: undefined
	LaunchDetails: {
		launchId: string
	}
}

export type HomeScreenNavigationProp = StackNavigationProp<RootParamList, 'Home'>
type HomeScreenRouteProp = RouteProp<RootParamList, 'Home'>

export type HomeScreenProps = {
	navigation: HomeScreenNavigationProp
	route: HomeScreenRouteProp
}

export type LaunchDetailsScreenNavigationProp = StackNavigationProp<RootParamList, 'LaunchDetails'>
export type LaunchDetailsScreenRouteProp = RouteProp<RootParamList, 'LaunchDetails'>

export type LaunchDetailsScreenProps = {
	navigation: LaunchDetailsScreenNavigationProp
	route: LaunchDetailsScreenRouteProp
}
