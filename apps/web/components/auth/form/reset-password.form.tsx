'use client';

import PasswordValidErrors from '@/components/auth/form/password-valid-errors';
import LogoIcon from '@/components/logo-icon';
import { resetPassword } from '@/server/auth.server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/shadcn/card';
import { Input } from '@repo/shadcn/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
} from '@repo/shadcn/input-otp';
import { Label } from '@repo/shadcn/label';
import { cn } from '@repo/shadcn/lib/utils';
import SubmitButton from '@repo/shadcn/submit-button';
import { Session } from 'next-auth';
import { useAction } from 'next-safe-action/hooks';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

const ResetPasswordForm = ({ session }: { session: Session | null }) => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const message = searchParams.get('message');

  const [formData, setFormData] = useState({
    identifier: email ?? session?.user?.email ?? '',
    newPassword: '',
    resetToken: '',
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const {
    execute,
    isExecuting,
    result: { validationErrors, serverError },
  } = useAction(resetPassword);
  return (
    <div className={cn('flex w-full flex-col gap-6')}>
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader className="mb-7 text-center">
          <LogoIcon className="mb-3" />
          <CardTitle className="text-start text-xl">Reset Password</CardTitle>
          <CardDescription
            className={cn('text-start', serverError && 'text-red-500')}
          >
            {serverError ?? message ?? 'Rest your password with reset token'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                execute(formData);
              }}
            >
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label isRequired htmlFor="email">
                      Email or Username
                    </Label>
                    <Input
                      disabled={isExecuting}
                      name="identifier"
                      id="email"
                      placeholder="acme@example.com or your username"
                      onChange={handleChange}
                      value={formData.identifier}
                      autoComplete="email"
                      required
                    />
                    {validationErrors?.identifier?._errors?.[0] && (
                      <p className="text-xs text-red-500">
                        {validationErrors.identifier._errors[0]}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label isRequired htmlFor="newPassword">
                        New Password
                      </Label>
                    </div>
                    <Input
                      disabled={isExecuting}
                      name="newPassword"
                      id="newPassword"
                      type="password"
                      onChange={handleChange}
                      required
                      autoFocus
                    />
                    <PasswordValidErrors password={formData.newPassword} />
                    {validationErrors?.newPassword?._errors?.[0] && (
                      <p className="text-xs text-red-500">
                        {validationErrors.newPassword._errors[0]}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label isRequired htmlFor="resetToken">
                        Enter your reset code
                      </Label>
                    </div>
                    <InputOTP
                      disabled={isExecuting}
                      className="w-full"
                      onChange={(resetToken) => {
                        setFormData((prevState) => ({
                          ...prevState,
                          resetToken,
                        }));
                      }}
                      maxLength={6}
                      minLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup className="grid w-full grid-cols-6 gap-5">
                        <InputOTPSlot
                          className="h-10 w-full rounded-md border first:rounded-md last:rounded-md"
                          index={0}
                        />
                        <InputOTPSlot
                          className="h-10 w-full rounded-md border first:rounded-md last:rounded-md"
                          index={1}
                        />
                        <InputOTPSlot
                          className="h-10 w-full rounded-md border first:rounded-md last:rounded-md"
                          index={2}
                        />
                        <InputOTPSlot
                          className="h-10 w-full rounded-md border first:rounded-md last:rounded-md"
                          index={3}
                        />
                        <InputOTPSlot
                          className="h-10 w-full rounded-md border first:rounded-md last:rounded-md"
                          index={4}
                        />
                        <InputOTPSlot
                          className="h-10 w-full rounded-md border first:rounded-md last:rounded-md"
                          index={5}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                    {validationErrors?.resetToken?._errors?.[0] && (
                      <p className="text-xs text-red-500">
                        {validationErrors.resetToken._errors[0]}
                      </p>
                    )}
                  </div>
                  <SubmitButton
                    isLoading={isExecuting}
                    name={'Reset Password'}
                  />
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
