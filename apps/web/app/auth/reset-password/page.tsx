import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import ResetPasswordForm from '@/components/auth/form/reset-password.form';

export default async function ResetPasswordPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="container flex min-h-screen items-center justify-center">
      <ResetPasswordForm session={session} />
    </div>
  );
}
