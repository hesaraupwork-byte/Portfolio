export default function AppBadge({ label, size = 'md' }) {
  const sizeClasses = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-11 w-11 text-sm';

  return (
    <span
      className={`flex ${sizeClasses} shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] font-bold text-black`}
    >
      {label}
    </span>
  );
}
