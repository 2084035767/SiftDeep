import { cn } from '@repo/shadcn/lib/utils';
import { CodeBlock } from '@repo/shadcn/tiptap/extensions/code-block';
import { ImageExtension } from '@repo/shadcn/tiptap/extensions/image';
import { ImagePlaceholder } from '@repo/shadcn/tiptap/extensions/image-placeholder';
import SearchAndReplace from '@repo/shadcn/tiptap/extensions/search-and-replace';
import { YouTubeExtension } from '@repo/shadcn/tiptap/extensions/youtube';
import { mergeAttributes } from '@tiptap/core';
import CharacterCount from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import { Heading } from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { createColGroup, Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { TaskItem } from '@tiptap/extension-task-item';
import { TaskList } from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { Typography } from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { DOMOutputSpec } from '@tiptap/pm/model';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';

export const TiptapStarterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cn('-mt-2 list-outside list-disc leading-3'),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cn('-mt-2 list-outside list-decimal leading-3'),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cn('-mb-2 leading-normal'),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cn('border-l-4 border-gray-600'),
    },
  },
  codeBlock: false,
  code: {
    HTMLAttributes: {
      class: cn(
        'bg-muted dark:bg-muted/90 rounded-lg px-1.5 py-1 font-mono font-medium text-red-700 before:content-none after:content-none dark:text-red-400',
      ),
      spellcheck: 'false',
    },
  },
  horizontalRule: {
    HTMLAttributes: {
      class: cn('bg-border border-border my-4'),
    },
  },
  dropcursor: {
    color: '#DBEAFE',
    width: 4,
  },
  gapcursor: false,
  heading: false,
});

const TiptapHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];

    if (node.textContent) {
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          id: node.textContent.replaceAll(/\s+/g, '-').toLowerCase(),
        }),
        0,
      ];
    }
    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});

const lowlight = createLowlight(common);
const codeBlock = CodeBlock.configure({
  HTMLAttributes: {
    class: cn(
      'rounded border !bg-gray-800 p-5 font-mono font-medium text-gray-200 dark:!bg-gray-900',
    ),
    spellcheck: false,
  },
  defaultLanguage: 'plaintext',
  lowlight: lowlight,
});

const TiptapTextAlign = TextAlign.configure({
  types: ['heading', 'paragraph'],
});

const TiptapTable = Table.extend({
  renderHTML({ node, HTMLAttributes }) {
    const { colgroup, tableWidth, tableMinWidth } = createColGroup(
      node,
      this.options.cellMinWidth,
    );

    const table: DOMOutputSpec = [
      'div',
      {
        class: 'table-wrapper overflow-y-auto my-[1em] not-draggable',
      },
      [
        'table',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          style: tableWidth
            ? `width: ${tableWidth}`
            : `minWidth: ${tableMinWidth}`,
        }),
        colgroup,
        ['tbody', 0],
      ],
    ];

    return table;
  },
}).configure({
  HTMLAttributes: {
    class: cn('not-prose w-full table-auto border-collapse'),
  },
  lastColumnResizable: false,
  allowTableNodeSelection: true,
});

const TiptapTaskList = TaskList.configure({
  itemTypeName: 'taskItem',
});

const TiptapTaskItem = TaskItem.configure({
  nested: true,
});

const TiptapTableHeader = TableHeader.configure({
  HTMLAttributes: {
    class: cn(
      'bg-muted border-default min-w-[150px] border p-2 text-start font-semibold dark:bg-gray-900',
    ),
  },
});

const TiptapTableCell = TableCell.configure({
  HTMLAttributes: {
    class: cn('border-default min-w-[150px] border p-2 align-middle'),
  },
});

const TiptapLink = Link.configure({
  HTMLAttributes: {
    class: cn(
      '!text-foreground cursor-pointer underline underline-offset-[3px] transition-colors',
    ),
  },
  openOnClick: false,
});

const TiptapImage = ImageExtension;

const DragHandle = GlobalDragHandle.configure({
  dragHandleWidth: 25,
  excludedTags: ['table'],
});

const TiptapYoutube = Youtube.configure({
  HTMLAttributes: {
    class: cn('border-muted border'),
  },
  nocookie: true,
});

const TiptapCharacterCount = CharacterCount;

const TiptapHighLight = Highlight.configure({
  multicolor: true,
});

const TiptapColor = Color.configure({
  types: ['textStyle'],
});

const TiptapFontFamily = FontFamily.configure({
  types: ['textStyle'],
});
const TiptapPlaceholder = Placeholder.configure({
  emptyNodeClass: 'is-editor-empty',
  placeholder: ({ node }) => {
    switch (node.type.name) {
      case 'heading':
        return `Heading ${node.attrs.level}`;
      case 'detailsSummary':
        return 'Section title';
      case 'codeBlock':
        // never show the placeholder when editing code
        return '';
      default:
        return "Write, type '/' for commands";
    }
  },
  includeChildren: false,
});

const TiptapSearch = SearchAndReplace;

const TiptapTypography = Typography.configure({});

const TiptapImagePlaceholder = ImagePlaceholder.configure({});

export const defaultExtensions = [
  TiptapStarterKit,
  TiptapHeading,
  TiptapTextAlign,
  TiptapTable,
  TiptapTableHeader,
  TableRow,
  TiptapTableCell,
  TiptapLink,
  YouTubeExtension,
  TiptapCharacterCount,
  TiptapImage,
  Underline,
  TextStyle,
  codeBlock,
  DragHandle,
  TiptapHighLight,
  TiptapColor,
  TiptapFontFamily,
  TiptapPlaceholder,
  TiptapSearch,
  TiptapTypography,
  TiptapImagePlaceholder,
  TiptapTaskList,
  TiptapTaskItem,
];
