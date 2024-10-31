import { GetServerSideProps } from 'next'
import { pagePaths } from '../../config/page-paths'

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		redirect: {
			destination: pagePaths.authPages.profile,
			permanent: false,
		},
	}
}

export default function Index() {
	return null
}
