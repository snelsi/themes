'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';
import {
  defaultSliderSize,
  defaultSliderVariant,
  defaultSliderColor,
  defaultSliderRadius,
} from './slider.props';

import type { MarginProps, Color, Radius, Responsive } from '../helpers';
import type { SliderSize, SliderVariant } from './slider.props';

type SliderElement = React.ElementRef<typeof SliderPrimitive.Root>;
interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'children'>,
    MarginProps {
  size?: Responsive<SliderSize>;
  variant?: SliderVariant;
  color?: Color;
  radius?: Radius;
}
const Slider = React.forwardRef<SliderElement, SliderProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    size = defaultSliderSize,
    variant = defaultSliderVariant,
    color = defaultSliderColor,
    radius = defaultSliderRadius,
    ...sliderProps
  } = marginRest;
  return (
    <SliderPrimitive.Root
      data-accent-scale={color}
      data-radius={radius}
      ref={forwardedRef}
      {...sliderProps}
      className={classNames(
        'rui-SliderRoot',
        withBreakpoints(size, 'size'),
        `variant-${variant}`,
        withMargin(marginProps),
        className
      )}
    >
      <SliderPrimitive.Track className="rui-SliderTrack">
        <SliderPrimitive.Range
          className="rui-SliderRange"
          data-inverted={sliderProps.inverted ? '' : undefined}
        />
      </SliderPrimitive.Track>
      {(sliderProps.value ?? sliderProps.defaultValue ?? []).map((value) => (
        <SliderPrimitive.Thumb key={value} className="rui-SliderThumb" />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = 'Slider';

export { Slider };
