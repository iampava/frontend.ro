import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  loading?: boolean;
  variant?:
  | 'light'
  | 'blue'
  | 'success'
  | 'danger'
  | 'transparent'
  | 'yellow'
  | 'grey'
  // We define here the form property because
  // even if it's a valid attribute on buttons, React or TS complain about it.
  form?: string;
  withIcon?: boolean;
  icon?: IconProp;
  outline?: boolean;
  bouncy?: boolean;
}
export type Ref = HTMLButtonElement;
const Button = React.forwardRef<
  Ref,
  PropsWithChildren<Props> & React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  (
    {
      icon,
      children,
      loading = false,
      className,
      disabled,
      variant = 'transparent',
      withIcon = false,
      outline = false,
      bouncy = false,
      ...props
    }: PropsWithChildren<Props> & React.ButtonHTMLAttributes<HTMLButtonElement>,
    forwardRef,
  ) => {
    let updatedClassName = className || '';
    if (loading) {
      updatedClassName += ' btn--loading';
    } else if (withIcon) {
      updatedClassName += ' btn--with-icon';
    } else if (outline) {
      updatedClassName += ' btn--outline';
    } else if (bouncy) {
      updatedClassName += ' btn--bouncy';
    } else {
      updatedClassName += '';
    }

    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={props.type || 'button'}
        className={`
          btn 
          ${variant === `${variant}` ? `btn--${variant}` : 'btn--transparent'} 
          ${updatedClassName}
        `}
        disabled={loading || disabled}
        ref={forwardRef}
        {...props}
      >
        {withIcon && (
          <FontAwesomeIcon icon={icon} height="24" className="mr-2" />
        )}
        {children}
      </button>
    );
  },
);
export default Button;
