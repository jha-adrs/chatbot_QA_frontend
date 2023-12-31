// Radix UI Tooltip

import * as Tooltip from '@radix-ui/react-tooltip';

export const TooltipWrapper = ({Component, text, classnames,...props}) => {
  return (
    
      <Tooltip.Root>
        <Tooltip.Trigger asChild {...props}>
            <Component className={`${classnames}`} />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" sideOffset={5}>
            {text}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
  );
};

