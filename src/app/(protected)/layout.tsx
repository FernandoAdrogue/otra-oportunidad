import { auth } from "@/auth"
 
const ProtectedLayout = async ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const session = await auth()

    if (!session) {
      return <div>Not authenticated</div>
    }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {children}
    </div>
  )
}

export default ProtectedLayout