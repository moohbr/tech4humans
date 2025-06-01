export async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(data.message, response.status, data.errors);
    }

    if (!data) {
        throw new ApiError('Erro ao processar a resposta', response.status, []);
    }

    if (response.status === 401) {
        throw new ApiError('Credenciais inválidas', response.status, []);
    }

    return data;
}


export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public errors?: string[]
    ) {
        super(message);
        this.name = 'ApiError';
    }
}
