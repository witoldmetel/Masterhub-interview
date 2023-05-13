import React from 'react'
import { Dimensions, View, StyleSheet, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

type LaunchImageWrapperProps = {
	links: {
		flickr_images?: string[]
		video_link: string
	}
}

export function LaunchImageWrapper({ links }: LaunchImageWrapperProps) {
	const width = Dimensions.get('window').width

	return (
		<View style={styles.imageContainer} testID="image-container">
			{links.flickr_images && links.flickr_images.length > 0 ? (
				<Carousel
					loop
					width={width}
					height={width / 2}
					autoPlay={true}
					data={links.flickr_images}
					scrollAnimationDuration={2000}
					renderItem={({ item }: { item: string }) => {
						return (
							<View style={styles.imageItem} testID="image">
								<Image key={item} source={{ uri: item }} style={styles.image} />
							</View>
						)
					}}
					testID="carousel"
				/>
			) : (
				<Image
					source={{ uri: `https://img.youtube.com/vi/${links.video_link.split('v=')[1]}/0.jpg` }}
					style={styles.videoThumbnail}
					testID="video-thumbnail"
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		height: 200,
		marginBottom: 8,
		resizeMode: 'contain',
		width: '100%',
	},
	imageContainer: {
		marginVertical: 16,
	},
	imageItem: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	videoThumbnail: {
		borderRadius: 8,
		height: 200,
		resizeMode: 'cover',
		width: '100%',
	},
})
