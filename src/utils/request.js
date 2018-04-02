const request = (method, url, body) => (history) => {
    method = method.toUpperCase();
    if (method === 'GET') {
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-token': sessionStorage.getItem('access-token') || ''
        },
        body
    }).then(res => {
        if (res.status === 401) {
            history.push('/login');
            return Promise.reject('unauthorized');
        } else {
            const token = res
                .headers
                .get('access-token');
            if (token) {
                sessionStorage.setItem('access-token', token);
            }

            return res.json();
        }
    });
}

export default request;
export const get = url => request('get', url);
export const post = (url, body) => request('post', url, body);
export const put = (url, body) => request('put', url, body);
export const del = (url, body) => request('delete', url, body);