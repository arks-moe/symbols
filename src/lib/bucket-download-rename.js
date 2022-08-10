// @ts-nocheck
import { supabaseClient } from './db';

export default function bucketDownloadRename(bucket, filename, newname) {
	const { publicURL, error } = supabaseClient.storage.from(bucket).getPublicUrl(filename);
	if (error) console.error(error);
	fetch(publicURL)
		.then(res => res.blob())
		.then(blob => URL.createObjectURL(blob))
		.then(href => {
			const a = document.createElement('a');
			a.href = href;
			a.download = newname;
			a.click();
			URL.revokeObjectURL(href);
		});
}
