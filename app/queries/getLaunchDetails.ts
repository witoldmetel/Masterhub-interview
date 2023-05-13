import { gql } from '@apollo/client'

export const GET_LAUNCH_DETAILS = gql`
	query GetLaunchDetails($id: ID!) {
		launch(id: $id) {
			mission_name
			launch_date_utc
			launch_success
			details
			links {
				flickr_images
				video_link
				wikipedia
			}
		}
	}
`
