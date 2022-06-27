// thanks internet https://dev.to/danawoodman/getting-form-body-data-in-your-sveltekit-endpoints-4a85

export default function getFormBody(body) {
	return [...body.entries()].reduce((data, [k, v]) => {
		let value = v;
		if (value === 'true') value = true;
		if (value === 'false') value = false;
		if (k in data) data[k] = Array.isArray(data[k]) ? [...data[k], value] : [data[k], value];
		else data[k] = value;
		return data;
	}, {});
}

// Usage:
// const body = getFormBody(req.body)
