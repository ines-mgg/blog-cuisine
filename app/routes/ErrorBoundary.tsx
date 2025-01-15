import { useRouteError } from "@remix-run/react";

export default function ErrorBoundary() {
  const error = useRouteError() as { message?: string };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-200 to-orange-400">
      <div className="text-9xl font-bold">
        <span className="text-black">Cook</span>
        <span className="text-[#FF6B35]">r</span>
      </div>
      <h1 className="text-4xl font-bold text-black mb-4">
        Oups! Quelque chose s&apos;est mal passé.
      </h1>
      <p className="text-lg text-gray-700 mb-2">
        Nous travaillons pour résoudre le problème.
      </p>
      {error && <p className="text-sm text-gray-500 italic">{error.message || 'Unknown error'}</p>}
    </div>
  );
}
