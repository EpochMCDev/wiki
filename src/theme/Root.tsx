import {useEffect, useState} from 'react';
import type {ReactNode} from 'react';
import '@fontsource-variable/noto-sans-sc';

export default function Root({children}: {children: ReactNode}) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    function onDblClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (target && target.tagName === 'IMG' && target.closest('main')) {
        e.preventDefault();
        setLightbox((target as HTMLImageElement).currentSrc || (target as HTMLImageElement).src);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setLightbox(null);
      }
    }

    document.addEventListener('dblclick', onDblClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('dblclick', onDblClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <>
      {children}
      {lightbox && (
        <div className="img-lightbox" role="dialog" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="放大预览" />
        </div>
      )}
    </>
  );
}
