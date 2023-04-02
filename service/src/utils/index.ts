import fs from 'fs/promises'

interface SendResponseOptions<T = any> {
  type: 'Success' | 'Fail'
  message?: string
  data?: T
}

export function sendResponse<T>(options: SendResponseOptions<T>) {
  if (options.type === 'Success') {
    return Promise.resolve({
      message: options.message ?? null,
      data: options.data ?? null,
      status: options.type,
    })
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    message: options.message ?? 'Failed',
    data: options.data ?? null,
    status: options.type,
  })
}

export async function logUsage(authId: string) {
  const usageFile: any = await fs.readFile('usage.json', 'utf8').catch(() => false)
  if (!usageFile)
    return
  const usage = JSON.parse(usageFile)
  const date = new Date()
  const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  usage[dateKey] = usage[dateKey] ?? {}
  usage[dateKey][authId] = usage[dateKey][authId] ?? 0
  usage[dateKey][authId] += 1
  await fs.writeFile('usage.json', JSON.stringify(usage, null, 2))
}
