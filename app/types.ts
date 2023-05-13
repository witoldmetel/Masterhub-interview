export type LaunchType = {
	id: string
	mission_name: string
	launch_date_local: Date
	rocket: {
		rocket: {
			id: string
			name: string
			active: boolean
		}
	}
}

export type SpecificLaunchData = {
	launch: {
		mission_name: string
		launch_date_utc: string
		launch_success: boolean
		details: string
		links: {
			flickr_images: string[]
			video_link: string
			wikipedia: string
		}
	}
}
