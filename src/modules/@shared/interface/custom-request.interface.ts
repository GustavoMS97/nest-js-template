import { Request } from 'express'

import { JwtTokenPayload } from '@app/modules/jwt-auth/jwt-auth.interface'

export interface CustomRequest extends Request {
  user: JwtTokenPayload
}
