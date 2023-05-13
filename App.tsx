import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import { RootNavigator } from './app/navigators/index'

const client = new ApolloClient({
	uri: 'https://spacex-production.up.railway.app/',
	cache: new InMemoryCache(),
})

export default function App() {
	return (
		<ApolloProvider client={client}>
			<RootNavigator />
		</ApolloProvider>
	)
}
