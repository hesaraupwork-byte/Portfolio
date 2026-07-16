import { FaCamera } from 'react-icons/fa6';

export default function PlaceholderPhoto({ className = '' }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border border-dashed border-white/15 bg-white/5 text-[var(--muted)] ${className}`}
    >
      <FaCamera className="text-2xl" />
      <span className="text-xs">Add photo</span>
    </div>
  );
}
