import * as React from 'react';
import classNames from 'classnames';
import { Slot } from './slot';
import { flexPropDefs } from './flex.props';
import {
  extractLayoutProps,
  extractMarginProps,
  getLayoutStyles,
  mergeStyles,
  withBreakpoints,
  withMarginProps,
} from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type FlexElement = React.ElementRef<'div'>;
type FlexOwnProps = GetPropDefTypes<typeof flexPropDefs>;
interface FlexProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    FlexOwnProps {
  asChild?: boolean;
}
const Flex = React.forwardRef<FlexElement, FlexProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const {
    className,
    asChild,
    style,
    display = flexPropDefs.display.default,
    direction = flexPropDefs.direction.default,
    align = flexPropDefs.align.default,
    justify = flexPropDefs.justify.default,
    wrap = flexPropDefs.wrap.default,
    gap = flexPropDefs.gap.default,
    ...flexProps
  } = layoutRest;
  const Comp = asChild ? Slot : 'div';
  const [layoutClassNames, layoutCustomProperties] = getLayoutStyles(layoutProps);
  return (
    <Comp
      {...flexProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Flex',
        className,
        withBreakpoints(display, 'rt-r-display'),
        withBreakpoints(direction, 'rt-r-fd'),
        withBreakpoints(align, 'rt-r-ai'),
        withBreakpoints(justify, 'rt-r-jc', { between: 'space-between' }),
        withBreakpoints(wrap, 'rt-r-fw'),
        withBreakpoints(gap, 'rt-r-gap'),
        withMarginProps(marginProps),
        layoutClassNames
      )}
      style={mergeStyles(layoutCustomProperties, style)}
    />
  );
});
Flex.displayName = 'Flex';

export { Flex };
export type { FlexProps };
