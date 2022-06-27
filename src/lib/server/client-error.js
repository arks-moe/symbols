//prettier-ignore
export default class ClientError {
	constructor(status, message) {
		this.status = status ? status : 400, 
    this.message = message ? message : 'Client error...';
	}
}
