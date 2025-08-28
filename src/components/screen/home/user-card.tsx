import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { currentUser } from '@/lib/auth/context/get-context-props'

export const UserCard = async () => {
  const user = await currentUser()
  if (!user) return null
  return (
    <Card variant="mixed" className="w-full max-w-md backdrop-blur-xs">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src={user.image || ''} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-sm/tight">{user.name}</CardTitle>
            <span className="text-sm text-muted-foreground">{user.email}</span>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/account/settings">Account</Link>
        </Button>

        {user.role === 'admin' && (
          <Button asChild>
            <Link href="/admin">Admin Panel</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
