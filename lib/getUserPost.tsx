import { notFound } from 'next/navigation'
export default async function getUserPost(userId: string) {
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
		next: { revalidate: 2 },
	})

	if (!res.ok) {
		return notFound()
	}
	return res.json()
}
