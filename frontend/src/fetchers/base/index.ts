export async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(data.message, response.status, data.errors);
    }

    return data;
}


class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public errors?: string[]
    ) {
        super(message);
        this.name = 'ApiError';
    }
}
