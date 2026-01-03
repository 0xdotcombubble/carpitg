export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  turnstileToken: string
}

export interface ContactApiResponse {
  success: boolean
  message: string
  emailId?: string
}

export interface ContactApiError {
  error: string
}
