'use client'
import { SessionProvider } from 'next-auth/react'
const Provider = ({children , session = null}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
export default Provider