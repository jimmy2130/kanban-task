import React from 'react';

function useClickOutside(
	ref: React.RefObject<HTMLElement>,
	callback: () => void,
) {
	React.useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		}
		window.addEventListener('click', handleClick);
		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [ref, callback]);
}

export default useClickOutside;
