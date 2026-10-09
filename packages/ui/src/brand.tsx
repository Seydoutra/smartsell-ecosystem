export function Brand({
  variant = 'purple',
  className = '',
}: {
  variant?: 'yellow' | 'white' | 'purple';
  className?: string;
}) {
  return (
    <span className={`brand brand--${variant} ${className}`}>
      <img
        src={`/brand/wordmark-${variant}.png`}
        width="3240"
        height="3240"
        alt="Smartsell"
      />
    </span>
  );
}
