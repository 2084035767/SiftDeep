'use client';

import LogoIcon from '@/components/logo-icon';
import { confirmEmail } from '@/server/auth.server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/shadcn/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS,
} from '@repo/shadcn/input-otp';
import { cn } from '@repo/shadcn/lib/utils';
import SubmitButton from '@repo/shadcn/submit-button';
import { useSession } from 'next-auth/react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';

const ConfirmEmailForm = () => {
  const session = useSession({
    required: true,
  });
  const [formData, setFormData] = useState({
    email: session?.data?.user.email ?? 'unknown',
    token: '',
  });
  const {
    executeAsync,
    isExecuting,
    result: { validationErrors, serverError },
  } = useAction(confirmEmail);
  return (
    <div className={cn('flex w-full flex-col gap-6')}>
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader className="mb-7 text-center">
          <LogoIcon className="mb-3" />
          <CardTitle className="text-start text-xl">Confirm Email</CardTitle>
          <CardDescription
            className={cn('text-start', serverError && 'text-red-500')}
          >
            {serverError ?? 'Enter your verification code'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                await executeAsync(formData);
              }}
            >
              <div className="grid gap-6">
                <div className="grid place-items-center gap-2">
                  <InputOTP
                    disabled={isExecuting}
                    className="w-full"
                    autoFocus
                    onChange={(token) => {
                      setFormData((prevState) => ({
                        ...prevState,
                        token,
                      }));
                    }}
                    maxLength={6}
                    minLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup className="grid w-full grid-cols-6 gap-5">
                      <InputOTPSlot
                        className="h-10 w-full rounded-xl border first:rounded-xl last:rounded-xl"
                        index={0}
                      />
                      <InputOTPSlot
                        className="h-10 w-full rounded-xl border first:rounded-xl last:rounded-xl"
                        index={1}
                      />
                      <InputOTPSlot
                        className="h-10 w-full rounded-xl border first:rounded-xl last:rounded-xl"
                        index={2}
                      />
                      <InputOTPSlot
                        className="h-10 w-full rounded-xl border first:rounded-xl last:rounded-xl"
                        index={3}
                      />
                      <InputOTPSlot
                        className="h-10 w-full rounded-xl border first:rounded-xl last:rounded-xl"
                        index={4}
                      />
                      <InputOTPSlot
                        className="h-10 w-full rounded-xl border first:rounded-xl last:rounded-xl"
                        index={5}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                  {validationErrors?.token?._errors?.[0] && (
                    <p className="text-xs text-red-500">
                      {validationErrors.token._errors[0]}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div />
                  <SubmitButton isLoading={isExecuting}>
                    Confirm email
                  </SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmEmailForm;
