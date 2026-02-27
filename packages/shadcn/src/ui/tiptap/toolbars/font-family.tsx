'use client';
/* eslint-disable */
// @ts-nocheck
import { Button } from '@repo/shadcn/button';
import { cn } from '@repo/shadcn/lib/utils';
import { Popover, PopoverContent } from '@repo/shadcn/popover';
import { ScrollArea } from '@repo/shadcn/scroll-area';
import { useToolbar } from '@repo/shadcn/tiptap/toolbars/toolbar-provider';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

const FONT_FAMILIES = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Comic Sans MS',
  'Arial',
  'Verdana',
];

interface FontFamilyItemProps {
  font: string;
  isActive: boolean;
  onClick: () => void;
}

const FontFamilyItem = ({ font, isActive, onClick }: FontFamilyItemProps) => (
  <button
    onClick={onClick}
    className="hover:bg-gray-3 flex w-full items-center justify-between rounded-sm px-2 py-1 text-sm font-medium"
    type="button"
  >
    <span style={{ fontFamily: font }}>{font}</span>
    {isActive && <CheckIcon className="size-4" />}
  </button>
);

export const FontFamilyToolbar = () => {
  const { editor } = useToolbar();

  const currentFont = editor?.getAttributes('textStyle').fontFamily;

  const handleFontChange = (font: string) => {
    editor?.chain().focus().setMark('textStyle', { fontFamily: font }).run();
  };

  if (!editor) return null;

  return (
    <Popover>
      <div className="relative h-full">
        <Button
          variant="ghost"
          size="sm"
          className={cn('h-8 w-32 p-0 text-left font-normal')}
        >
          <span className="truncate" style={{ fontFamily: currentFont }}>
            {currentFont || 'Font'}
          </span>
          <ChevronDownIcon className="ml-2 size-4" />
        </Button>

        <PopoverContent align="start" className="dark:bg-gray-2 w-56 p-1">
          <ScrollArea className="max-h-80 overflow-y-auto pr-2">
            {FONT_FAMILIES.map((font) => (
              <FontFamilyItem
                key={font}
                font={font}
                isActive={currentFont === font}
                onClick={() => handleFontChange(font)}
              />
            ))}
          </ScrollArea>
        </PopoverContent>
      </div>
    </Popover>
  );
};
