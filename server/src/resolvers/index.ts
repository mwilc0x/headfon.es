import { Query } from './Query'
import { auth } from './Mutation/auth'
import { post } from './Mutation/post'

export default {
  Query,
  Mutation: {
    ...auth,
    ...post,
  },
}
