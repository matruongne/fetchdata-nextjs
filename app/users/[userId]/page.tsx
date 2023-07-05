import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import getUser from '@/lib/getUser'
import getUserPost from '@/lib/getUserPost'
import UserPosts from './components/UserPosts'
import getALLusers from '@/lib/getALLusers'
type Params = {
	params: {
		userId: string
	}
}

export async function generateMetadata({ params: { userId } }: Params): Promise<Metadata> {
	const userData: Promise<User> = getUser(userId)
	const user: User = await userData

	if (!user.name) {
		return {
			title: 'User not found',
		}
	}

	return {
		title: user.name,
		description: user.username,
	}
}

export default async function UserPage({ params: { userId } }: Params) {
	const userData: Promise<User> = getUser(userId)
	const userPostsData: Promise<Post[]> = getUserPost(userId)

	// const [user, userPost] = await Promise.all([userData, userPostsData])
	const user: User = await userData

	if (!user.name) {
		return notFound()
	}

	return (
		<>
			<h2>{user.name}</h2>
			<Suspense fallback={<h2>Loading ...</h2>}>
				{/*@ts-expect-error Server Component */}
				<UserPosts promise={userPostsData} />
			</Suspense>
		</>
	)
}

export async function generateStaticParams() {
	const usersData: Promise<User[]> = getALLusers()
	const users: User[] = await usersData

	return users.map((user) => ({ userId: user.id.toString() }))
}
