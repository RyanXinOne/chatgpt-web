import * as fs from 'fs/promises'

const auth = async (req, res, next) => {
  const authConfig = await readAuthConfig()
  if (Object.keys(authConfig).length > 0) {
    try {
      const token = req.header('Authorization').replace('Bearer ', '')
      if (!(token.trim() in authConfig))
        throw new Error('Invalid token')
      next()
    }
    catch (error) {
      res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
    }
  }
  else {
    next()
  }
}

async function readAuthConfig() {
  const fileContents = await fs.readFile('auth.json', 'utf8')
  return JSON.parse(fileContents)
}

export { auth, readAuthConfig }
