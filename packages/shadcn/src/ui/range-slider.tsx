'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@repo/shadcn/lib/utils';
import * as React from 'react';

interface DualRangeSliderProps extends React.ComponentProps<
  typeof SliderPrimitive.Root
> {
  labelPosition?: 'top' | 'bottom';
  label: (value: number | undefined) => React.ReactNode;
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(({ className, label, labelPosition = 'top', ...props }, ref) => {
  const initialValue = Array.isArray(props.value)
    ? props.value
    : [props.min, props.max];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full cursor-pointer touch-none items-center select-none',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden bg-gray-300 dark:bg-gray-800">
        <SliderPrimitive.Range className="bg-primary absolute h-full" />
      </SliderPrimitive.Track>
      <>
        {initialValue.map((value, index) => (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb className="border-primary bg-background relative block size-2 border-2 transition-all duration-500 disabled:pointer-events-none disabled:opacity-50">
              <div
                className={cn(
                  'absolute flex w-full items-start justify-center gap-0.5 bg-transparent',
                  labelPosition === 'top' && '-top-5',
                  labelPosition === 'bottom' && 'top-4',
                )}
              >
                <span className="bg-primary inline-block -translate-y-1 px-1 py-px text-[8px]">
                  {label(value)}
                </span>
              </div>
            </SliderPrimitive.Thumb>
          </React.Fragment>
        ))}
      </>
    </SliderPrimitive.Root>
  );
});
DualRangeSlider.displayName = 'DualRangeSlider';

export { DualRangeSlider };
