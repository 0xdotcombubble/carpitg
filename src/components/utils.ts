import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPhoneNumber = (phone: string): string => {
  return phone.replace('+36', '06 ').replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')
}