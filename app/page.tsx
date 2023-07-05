import Link from 'next/link'

export default function Home() {
	return (
		<main>
			<h1>Home page</h1>
			<p>
				<Link href="/users">Users</Link>
			</p>
		</main>
	)
}
