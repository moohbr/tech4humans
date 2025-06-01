import { handleResponse } from '../base'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function deleteAccount(accountId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`, {
    method: 'DELETE',
  })
  await handleResponse(response)
}