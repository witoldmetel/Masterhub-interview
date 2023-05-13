import React from 'react'
import { render } from '@testing-library/react-native'
import { Text } from 'react-native'

import { ScreenWrapper } from '../../app/components/ScreenWrapper'

describe('ScreenWrapper', () => {
	it('renders children', () => {
		const { getByTestId } = render(
			<ScreenWrapper>
				<Text testID="child-element">Child element</Text>
			</ScreenWrapper>,
		)

		expect(getByTestId('child-element')).toBeDefined()

		const rootContainer = getByTestId('root-container')

		expect(rootContainer).toBeDefined()
		expect(rootContainer.props.style.backgroundColor).toBe('#010103')
		expect(rootContainer.props.style.flex).toBe(1)
	})
})
