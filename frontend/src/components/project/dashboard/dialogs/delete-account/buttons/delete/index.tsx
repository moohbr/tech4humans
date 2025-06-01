import { Button } from '@/components/ui/button'
import { Trash2, Loader2 } from 'lucide-react'
import { DeleteButtonProps } from './types'

export function DeleteButton({ onClick, disabled, isLoading }: DeleteButtonProps) {
  return (
    <Button
      variant="destructive"
      size="sm"
      className="gap-2"
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
      {isLoading ? 'Carregando...' : 'Excluir conta'}
    </Button>
  )
} 