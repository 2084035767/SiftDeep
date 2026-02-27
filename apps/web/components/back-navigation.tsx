import { Button } from '@repo/shadcn/button';
import { ChevronLeft } from '@repo/shadcn/lucide';
import Link from 'next/link';
const BackNavigation = () => {
  return (
    <header className="bg-background mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="group">
        <Link href="/">
          <ChevronLeft className="size-5 transition-transform duration-500 group-hover:-translate-x-2" />
          Home
        </Link>
      </Button>
    </header>
  );
};

export default BackNavigation;
