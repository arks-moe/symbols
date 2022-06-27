import { toast } from '@zerodevx/svelte-toast';
export function toastError(msg) {
	toast.push(`Error: ${msg}`, {
		theme: {
			'--toastBackground': '#F56565',
			'--toastBarBackground': '#C53030'
		}
	});
}
