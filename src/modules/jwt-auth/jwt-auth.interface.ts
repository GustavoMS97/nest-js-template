export interface JwtUserValidationInterface {
  id: number
}

export interface JwtTokenResult {
  access_token: string
  refresh_token: string
}

export interface JwtTokenPayload {
  user_id: number
}

export interface JwtRefreshTokenPayload extends JwtTokenPayload {
  refresh: true
}
