// @ts-nocheck
import supabase from './supabase-client';

export default function bucketDownloadRename(bucket, filename, newname) {
	const { publicURL, error } = supabase.storage.from(bucket).getPublicUrl(filename);
	if (error) console.error(error);
	fetch(publicURL)
		.then(res => res.blob())
		.then(blob => URL.createObjectURL(blob))
		.then(href => {
			const a = document.createElement('a');
			a.href = href;
			a.download = newname;
			a.click();
		});
}
