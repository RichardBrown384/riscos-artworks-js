import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallbackComponent } from './error-fallback-component';
import { SVGComponent } from './svg-component';
import { useFileBuffer } from './use-file-buffer';

export function App() {
  const { buffer, loadFile, reset } = useFileBuffer();

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    void loadFile(file);
  }

  return (
    <div>
      <h1>RISC OS File Viewer</h1>
      <p>
        Can be used to view !Draw, !Sprite, Font Outline, and !ArtWorks files.
      </p>
      <p>
        The files remain on your computer and are not uploaded to a 3rd-party
        server.
      </p>
      <ErrorBoundary FallbackComponent={ErrorFallbackComponent} onReset={reset}>
        <input type="file" onChange={onFileChange} />
        <SVGComponent buffer={buffer ?? undefined} />
      </ErrorBoundary>
    </div>
  );
}
