'use client';

import SignOut from '@/components/auth/sign-out';
import { buttonVariants } from '@repo/shadcn/button';
import { cn } from '@repo/shadcn/lib/utils';
import {
  Palette,
  Shield,
  Smartphone,
  User as UserIcon,
  UserPenIcon,
} from '@repo/shadcn/lucide';
import { TabsList, TabsTrigger } from '@repo/shadcn/tabs';

const ProfileSidebar = () => {
  const menuItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: UserIcon,
    },
    {
      id: 'general',
      label: 'General',
      icon: UserPenIcon,
    },
    {
      id: 'security',
      label: 'Security and Login',
      icon: Shield,
    },
    {
      id: 'sessions',
      label: 'Active Sessions',
      icon: Smartphone,
    },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: Palette,
    },
  ];
  return (
    <div className="bg-card text-card-foreground w-full rounded-xl border p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Settings</h2>
      <TabsList className="bg-card grid h-auto w-full grid-cols-1 gap-1 p-0 px-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <TabsTrigger
              key={item.id}
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  class:
                    'data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:hover:bg-secondary/80 min-w-full justify-start data-[state=active]:shadow-xs',
                }),
              )}
              value={item.id}
            >
              <Icon className="mr-2 size-4" />
              {item.label}
            </TabsTrigger>
          );
        })}

        <SignOut />
      </TabsList>
    </div>
  );
};

export default ProfileSidebar;
