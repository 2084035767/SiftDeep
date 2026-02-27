'use client';
import { cn } from '@repo/shadcn/lib/utils';

const PasswordValidErrors = ({ password }: { password: string }) => {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-medium">Password requirements:</p>
      <ul className="mt-2 space-y-1 text-sm">
        <li
          className={cn(
            'text-sm',
            password.length >= 8
              ? 'text-green-500'
              : 'text-red-500 line-through',
          )}
        >
          • At least 8 characters
        </li>
        <li
          className={cn(
            'text-sm',
            /[A-Z]/.test(password)
              ? 'text-green-500'
              : 'text-red-500 line-through',
          )}
        >
          • At least one uppercase letter
        </li>
        <li
          className={cn(
            'text-sm',
            /\d/.test(password)
              ? 'text-green-500'
              : 'text-red-500 line-through',
          )}
        >
          • At least one number
        </li>
        <li
          className={cn(
            'text-sm',
            /[!@#$%^&*(),.?":{}|<>]/.test(password)
              ? 'text-green-500'
              : 'text-red-500 line-through',
          )}
        >
          • At least one special character
        </li>
      </ul>
    </div>
  );
};

export default PasswordValidErrors;
