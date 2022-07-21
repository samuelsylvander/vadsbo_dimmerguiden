let timeout;

export default function debounce(callback, wait) {
	clearTimeout(timeout);
	timeout = setTimeout(() => callback(), wait);
}

// version which calls the callback with arguments, but needs to be wrapped in useCallback to work
// function debounce(callback, wait) {
// 	let timeout;
// 	return (...args) => {
// 		clearTimeout(timeout);
// 		timeout = setTimeout(() => callback(args), wait);
// 	};
// }
