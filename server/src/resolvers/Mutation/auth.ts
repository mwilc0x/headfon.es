import { Context } from '../../utils'

export const auth = {
  async login(parent, { email, password }, ctx: Context, info) {

    return {
      token: '12345',
      user: {}
    }
  },
}
