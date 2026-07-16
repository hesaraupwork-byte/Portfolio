import Spinner from '@/components/Spinner';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <Spinner scale={1.4} />
    </div>
  );
}
