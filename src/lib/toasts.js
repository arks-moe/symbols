import { toast } from '@zerodevx/svelte-toast';

export function toastSuccess(msg) {
	toast.push(msg, {
		theme: {
			'--toastBackground': '#48BB78',
			'--toastBarBackground': '#2F855A'
		}
	});
}

export function toastError(msg) {
	toast.push(`Error: ${msg}`, {
		theme: {
			'--toastBackground': '#F56565',
			'--toastBarBackground': '#C53030'
		}
	});
}

/**
 *
 * @param {Promise} promise
 * @param {Object} messages
 * @param {string} messages.loading - Loading message for box
 * @param {string} messages.success - Success message
 * @param {string} messages.error - Error message
 */
export async function toastPromise(promise, messages) {
	const { loading, success, error } = messages;
	const toastId = toast.push(loading, {
		initial: 0,
		next: 0,
		dismissable: false
	});
	try {
		await promise;
		toast.set(toastId, {
			msg: success,
			theme: {
				'--toastBackground': '#48BB78',
				'--toastBarBackground': '#2F855A'
			},
			next: 1,
			dismissable: true
		});
	} catch (err) {
		console.error(err);
		toast.set(toastId, {
			msg: error ? error : err.message,
			theme: {
				'--toastBackground': '#F56565',
				'--toastBarBackground': '#C53030'
			},
			next: 1,
			dismissable: true
		});
	}
}
