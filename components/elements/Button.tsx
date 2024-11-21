// components/elements/Button.tsx
import Link from 'next/link';
import { ButtonProps } from '../../types/buttons'; // Import the types

const Button: React.FC<ButtonProps> = ({ type = 'button', size = 'md', variant = 'primary', href, onClick, children, className = '' }) => {
  const baseClass = `btn btn-${variant} btn-${size} ${className}`;

  if (href) {
    return (
      <Link href={href} passHref>
        <a className={baseClass}>{children}</a>
      </Link>
    );
  }

  return (
    <button type={type} className={baseClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
