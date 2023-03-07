import { ss } from '@/utils/storage'

const LOCAL_NAME = 'SECRET_TOKEN'

export function getToken() {
  // replace old 'SECRET_KEY' with 'SECRET_TOKEN' if exists
  const oldToken = ss.get('SECRET_KEY')
  if (oldToken) {
    ss.set(LOCAL_NAME, oldToken)
    ss.remove('SECRET_KEY')
  }
  return ss.get(LOCAL_NAME)
}

export function setToken(token: string) {
  return ss.set(LOCAL_NAME, token)
}

export function removeToken() {
  return ss.remove(LOCAL_NAME)
}
