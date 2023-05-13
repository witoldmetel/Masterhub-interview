import { gql } from '@apollo/client'

export const GET_OLDEST_LAUNCHES = gql`
	query GetOldestLaunches($limit: Int!, $offset: Int!) {
		launchesPast(limit: $limit, offset: $offset) {
			id
			mission_name
			launch_date_local
			rocket {
				rocket {
					id
					name
					active
				}
			}
		}
	}
`
