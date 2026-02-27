import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import ProfileAvatarEditor from '@/components/profile/profile-avatar-editor';
import { User } from '@/types/user.type';
import { Button } from '@repo/shadcn/button';
import { Camera, Edit } from '@repo/shadcn/lucide';
import Image from 'next/image';
import Link from 'next/link';

const ProfileHeader = async ({ user }: { user: User }) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative pb-4">
      {/* Cover Photo */}
      <div className="relative h-48 w-full overflow-hidden rounded-b-lg sm:h-64">
        <Image
          src={'/assets/placeholder.svg'}
          alt="Cover"
          fill
          className="h-full w-full object-cover"
        />
        <Button
          size="sm"
          variant="secondary"
          className="absolute right-4 bottom-4 hidden items-center gap-1"
        >
          <Camera className="size-4" />
          <span>Edit Cover Photo</span>
        </Button>
      </div>

      {/* Profile Photo and Name */}
      <div className="relative z-10 -mt-16 ml-0 flex flex-col items-center gap-4 sm:-mt-20 sm:ml-8 sm:flex-row sm:items-end">
        <div className="relative">
          <ProfileAvatarEditor />
        </div>

        <div className="mb-2 flex flex-col items-center gap-2 sm:mb-4 sm:flex-row sm:items-end sm:gap-4">
          <div className="text-center sm:text-left">
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              {user.profile.name ?? session?.user.profile.name}
              {user.username === session?.user?.username &&
                !session?.user.isEmailVerified && (
                  <Link
                    href={'/auth/confirm-email'}
                    className="text-sm font-normal underline"
                  >
                    verified
                  </Link>
                )}
            </h1>
            <p className="text-muted-foreground text-sm">
              {user.username ?? session?.user?.username}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="hidden items-center gap-1"
          >
            <Edit className="size-4" />
            <span>Edit Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
