import axios from 'axios';

const createResource = (api, data, tok) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${api}`, data, { headers: { "token": tok } })
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const getResource = api => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${api}`, { headers: { 'xt-user-token': token } })
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};


const updateResource = (api, data,token) => {
	return new Promise((resolve, reject) => {
		axios
			.put(`${api}`, data, {
				headers: { 'token': token }
			})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const deleteResource = api => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'delete',
			url: `${api}`,
			headers: { 'x-user-token': token }
		})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const uploadContent = (api, data) => {
	var formData = new FormData();
	formData.append('file', data[0]);

	return new Promise((resolve, reject) => {
		axios
			.post(`${api}`, formData, { headers: { 'xt-user-token': token } })
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
	})
};



export {
	createResource,
	getResource,
	updateResource,
	deleteResource,
};