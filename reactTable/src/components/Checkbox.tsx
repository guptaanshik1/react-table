import React from "react";

export const Checkbox = React.forwardRef(({ indertiminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indertiminate = indertiminate;
  }, [resolvedRef, indertiminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});
