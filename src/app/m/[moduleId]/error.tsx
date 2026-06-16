"use client";

import { ErrorView } from "../../components/nfc/StatusViews";

export default function ModuleError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="w-full max-w-md">
      <ErrorView
        message="Algo ha fallado al cargar la pantalla. Inténtalo de nuevo."
        onRetry={reset}
      />
    </div>
  );
}
