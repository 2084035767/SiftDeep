'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const filters = [
  { id: 'all', label: '全部' },
  { id: 'featured', label: '精选' },
  { id: 'trending', label: '热门' },
  { id: 'new', label: '最新' },
];

export function QuickFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get('filter') || 'all';

  const handleFilterChange = useCallback(
    (filterId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (filterId === 'all') {
        params.delete('filter');
      } else {
        params.set('filter', filterId);
      }
      router.push(`/library?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto py-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterChange(filter.id)}
          className={`filter-item ${
            activeFilter === filter.id ? 'active' : ''
          }`}
          aria-pressed={activeFilter === filter.id}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
