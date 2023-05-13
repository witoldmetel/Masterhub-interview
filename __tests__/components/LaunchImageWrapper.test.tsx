import React from 'react'
import { render } from '@testing-library/react-native'
import { Dimensions } from 'react-native'

import { LaunchImageWrapper } from '../../app/components/LaunchImageWrapper'

jest.mock('react-native-reanimated-carousel', () => 'Carousel')

describe('LaunchImageWrapper', () => {
	const links = {
		flickr_images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
		video_link: 'https://www.youtube.com/watch?v=videoId',
	}

	beforeEach(() => {
		// Mock the Dimensions.get function so that the test can set specific window dimensions
		Dimensions.get = jest.fn().mockReturnValue({ width: 400, height: 800 })
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	it('renders a carousel if flickr_images are provided', () => {
		const { getByTestId } = render(<LaunchImageWrapper links={links} />)

		const imageContainer = getByTestId('image-container')

		expect(imageContainer).toBeTruthy()

		const carousel = getByTestId('carousel')

		expect(carousel).toBeTruthy()
		expect(carousel.props.width).toEqual(400)
		expect(carousel.props.height).toEqual(200)
		expect(carousel.props.autoPlay).toBeTruthy()

		const images = carousel.props.data

		expect(images).toHaveLength(2)
		expect(images[0]).toEqual('https://example.com/image1.jpg')
		expect(images[1]).toEqual('https://example.com/image2.jpg')
	})

	it('renders a video thumbnail if no flickr_images are provided', () => {
		const { getByTestId } = render(<LaunchImageWrapper links={{ ...links, flickr_images: [] }} />)

		const imageContainer = getByTestId('image-container')

		expect(imageContainer).toBeTruthy()

		const videoThumbnail = getByTestId('video-thumbnail')

		expect(videoThumbnail).toBeTruthy()
		expect(videoThumbnail.props.source.uri).toEqual('https://img.youtube.com/vi/videoId/0.jpg')
	})
})
