export default async function getALLusers() {
	const res = await fetch('https://jsonplaceholder.typicode.com/users')

	if (!res.ok) {
		throw new Error('Something went wrong!')
	}
	return res.json()
}
