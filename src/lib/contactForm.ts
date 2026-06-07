export type ContactFormPayload = {
  name: string
  email: string
  phone: string
  message: string
  subject: string
}

type Web3FormsResponse = {
  success: boolean
  message?: string
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    throw new Error('MISSING_ACCESS_KEY')
  }

  const body: Record<string, string> = {
    access_key: accessKey,
    subject: payload.subject,
    name: payload.name,
    email: payload.email,
    message: payload.message,
  }

  if (payload.phone) {
    body.phone = payload.phone
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error('REQUEST_FAILED')
  }

  const data = (await response.json()) as Web3FormsResponse

  if (!data.success) {
    throw new Error('SEND_FAILED')
  }
}
