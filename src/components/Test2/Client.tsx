'use client';
import * as React from 'react';
import useSWRMutation from 'swr/mutation';

async function addUser(
	endpoint: string,
	{ arg }: { arg: { name: string; email: string } },
) {
	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(arg),
	});
	const json = await response.json();
	return json;
}

function Client({ revalidate }: { revalidate: (path: string) => void }) {
	const { trigger } = useSWRMutation('/api', addUser);

	React.useEffect(() => {
		function handleKeydown(event: KeyboardEvent) {
			if (event.key === 's') {
				const key = Math.random().toString().slice(2);
				trigger({ name: key, email: `${key}@gmail.com` });
				revalidate('/');
			}
		}
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	}, [trigger]);

	return null;
}

export default Client;
