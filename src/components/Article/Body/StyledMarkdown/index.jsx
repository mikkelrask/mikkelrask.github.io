import React from 'react';

const StyledMarkdown = React.forwardRef(({ id, className, dangerouslySetInnerHTML, itemProp, children }, ref) => {
  return (
    <div
      id={id}
      className={className}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      itemProp={itemProp}
      ref={ref}
    >
      {children}
    </div>
  );
});

export default StyledMarkdown;
