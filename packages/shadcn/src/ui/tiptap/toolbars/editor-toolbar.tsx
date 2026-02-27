import { AlignmentToolbar } from '@repo/shadcn/tiptap/toolbars/alignment';
import { ColorHighlightToolbar } from '@repo/shadcn/tiptap/toolbars/color-and-highlight';
import EmojiEditor from '@repo/shadcn/tiptap/toolbars/emoji-toolbar';
import { HardBreakToolbar } from '@repo/shadcn/tiptap/toolbars/hard-break';
import { HorizontalRuleToolbar } from '@repo/shadcn/tiptap/toolbars/horizontal-rule';
import { LinkToolbar } from '@repo/shadcn/tiptap/toolbars/link';
import { RedoToolbar } from '@repo/shadcn/tiptap/toolbars/redo';
import { SearchAndReplaceToolbar } from '@repo/shadcn/tiptap/toolbars/search-and-replace-toolbar';
import { TextToolbar } from '@repo/shadcn/tiptap/toolbars/text-toolbar';
import { ToolbarProvider } from '@repo/shadcn/tiptap/toolbars/toolbar-provider';
import { UndoToolbar } from '@repo/shadcn/tiptap/toolbars/undo';
import UtilToolbar from '@repo/shadcn/tiptap/toolbars/util-toolbar';
import YoutubeToolbar from '@repo/shadcn/tiptap/toolbars/youtube-toolbar';
import { TooltipProvider } from '@repo/shadcn/tooltip';
import { Editor } from '@tiptap/core';

export const EditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="bg-accent sticky top-0 z-20 w-full rounded-md border-b px-2 select-none">
      <ToolbarProvider editor={editor}>
        <TooltipProvider>
          <div>
            <div className="flex flex-wrap items-center gap-1 md:px-2">
              <div className="flex w-full justify-between gap-1 md:w-auto md:justify-start">
                <TextToolbar />
                <div className="items-center gap-1 md:flex">
                  <UndoToolbar />
                  <RedoToolbar />
                </div>
                <div className="flex items-center gap-1">
                  <LinkToolbar />
                  <AlignmentToolbar />
                  <HorizontalRuleToolbar />
                </div>
              </div>
              <div className="flex w-full flex-1 items-center justify-between md:w-fit">
                <div className="flex items-center gap-1">
                  <ColorHighlightToolbar />
                  <UtilToolbar />
                  <EmojiEditor />
                </div>
                <div className="items-center gap-1">
                  <YoutubeToolbar />
                  <HardBreakToolbar />
                  <SearchAndReplaceToolbar />
                </div>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </ToolbarProvider>
    </div>
  );
};
