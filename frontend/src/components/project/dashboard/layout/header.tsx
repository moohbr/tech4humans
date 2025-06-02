import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { useNavigate } from '@tanstack/react-router'
import { useTheme } from '@/contexts/theme'
import { MoonIcon, SunIcon, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"

const getInitials = (name: string | undefined | null): string => {
  if (!name) return 'U'
  
  const names = name.trim().split(' ')
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase()
  }
  return names[0][0].toUpperCase()
}

export function DashboardHeader() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    logout()
    navigate({ to: '/auth/sign-in' })
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const displayName = user?.name?.trim() || 'Unknown User'
  const initials = getInitials(user?.name)

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm w-full"
    >
      <div className="w-full max-w-none px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-semibold text-sm sm:text-base">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate" title={displayName}>
                {displayName}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate sm:block hidden" title={user?.email}>
                {user?.email || 'unknown@example.com'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <MoonIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="rounded-full text-red-500 dark:text-red-400 h-8 w-8 sm:h-10 sm:w-10"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 