
export class Api {

    static baseURL = "http://127.0.0.1:8000/api"; 

    static async post(url, data) {
        const response = await fetch( `${Api.baseURL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const dataResponse = await response.json();

        return {
            statusCode: response.status,
            dataResponse,
        }

    }
}