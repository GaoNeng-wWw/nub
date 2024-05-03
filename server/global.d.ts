declare namespace NodeJS {
  interface ProcessEnv {
    client_id: string
    redirect_url: string
    client_secret: string
    POSTGRES_URL: string
    POSTGRES_PRISMA_URL: string
    POSTGRES_URL_NO_SSL: string
    POSTGRES_URL_NON_POOLING: string
    POSTGRES_USER: string
    POSTGRES_HOST: string
    POSTGRES_PASSWORD: string
    POSTGRES_DATABASE: string
    NUB_KV_URL: string
    NUB_KV_REST_API_URL: string
    NUB_KV_REST_API_TOKEN: string
    NUB_KV_REST_API_READ_ONLY_TOKEN: string
  }
}
