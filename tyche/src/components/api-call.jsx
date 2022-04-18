import axios from "axios";

export const callAPI = async (request) => {
    try {
        console.log("PROCESS\n", process)
        const response = await axios({
            url: request.url,
            mode: 'no-cors',
            method: request.method,
            baseURL: request.baseURL || process.env.REACT_APP_DOMAIN,
            headers: {
                ...request.headers,
                //...authorization,
                "Content-Type": "application/json",
            },
            data: request.data || {},
            params: request.params || {},
        })
        return {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            payload: response.data,
        };
    }
    catch (e) {
        const error = e.response
        const { status = '', statusText = '', headers = {}, data = null } = error;
        const result = {
            status,
            statusText,
            headers,
            payload: data,
        };
        throw result;
    }
}