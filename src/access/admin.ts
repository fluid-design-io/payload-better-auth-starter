import type { Access, AccessArgs, TypedUser } from 'payload'

type isAdmin = (args: AccessArgs) => boolean
type isAdminOrSelf = Access

const checkIsAdmin = (user: TypedUser | null) => {
  if (!user || !user.role || !['admin'].includes(user.role)) return false
  return true
}

export const isAdmin: isAdmin = ({ req: { user } }) => {
  return checkIsAdmin(user)
}

export const isAdminOrSelf: isAdminOrSelf = ({ req: { user } }) => {
  if (checkIsAdmin(user)) return true
  return {
    userId: {
      equals: user?.id,
    },
  }
}

export const adminOrPublished: Access = ({ req: { user } }) => {
  if (checkIsAdmin(user)) return true
  return {
    _status: {
      equals: 'published',
    },
  }
}
