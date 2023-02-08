declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      SECRET: string
      NODE_ENV: string
      MONGO_URI: string
    }
  }
}

export {}
