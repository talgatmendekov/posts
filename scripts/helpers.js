const BASE_URL = 'https://jsonplaceholder.typicode.com'

async function sendRequest(requestConfig) {
    const requestOptions = {
        method: requestConfig.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    
    if(requestConfig.method !== 'GET' && requestConfig.body) {
        requestOptions.body = JSON.stringify(requestConfig.body)
    }

    const response = await fetch(BASE_URL + requestConfig.url, requestOptions)
    if (!response.ok) {
        throw new Error(response.message)
    }

    const contentType = response.headers.get('content-type')

    if(contentType.includes('application/json')) {
        return response.json()
    }

    return {}
}

const saveToLocalStorage = (key, data) => {
    return localStorage.setItem(key, JSON.stringify(data))
}

const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}
