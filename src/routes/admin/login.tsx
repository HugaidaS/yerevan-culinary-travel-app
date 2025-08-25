import { createFileRoute } from '@tanstack/react-router'
import { Button, Card, Input, Label } from '@/shared/ui'

export const Route = createFileRoute('/admin/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="flex items-center justify-center py-10">
      <Card className="w-full max-w-md p-6 space-y-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage content.</p>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full" onClick={() => signInWithGoogle()}>
            Continue with Google
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">Google OAuth will be wired next. For now this is UI only.</div>
      </Card>
    </div>
  )
}

function signInWithGoogle() {
  // TODO: Implement Google OAuth flow in a follow-up step
  console.log('Google sign-in clicked')
}
