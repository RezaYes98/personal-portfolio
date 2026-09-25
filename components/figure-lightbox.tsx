'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface LightboxState {
  src: string
  alt: string
}

export function FigureLightbox({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<LightboxState | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const close = useCallback(() => {
    setOpen(null)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ''
      return
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'Tab') {
        const root = document.getElementById('figure-lightbox')
        if (!root) return
        const stops = Array.from(
          root.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')
        ).filter((el) => !el.hasAttribute('disabled'))
        if (stops.length === 0) return
        const first = stops[0]
        const last = stops[stops.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close])

  useEffect(() => {
    const onTrigger = (e: Event) => {
      const detail = (e as CustomEvent<LightboxState>).detail
      if (!detail?.src) return
      triggerRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      setOpen({ src: detail.src, alt: detail.alt })
    }
    document.addEventListener('figure-zoom', onTrigger)
    return () => document.removeEventListener('figure-zoom', onTrigger)
  }, [])

  return (
    <>
      {children}
      {open && (
        <div
          id="figure-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/[0.97] p-6"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="t-micro absolute top-4 right-6 text-neutral-600 transition-colors hover:text-neutral-900"
          >
            close
          </button>
          <img
            src={open.src}
            alt=""
            aria-hidden="true"
            className="max-h-[80vh] w-auto max-w-full"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="t-body mt-3 max-w-xl text-center text-sm text-neutral-500">
            {open.alt}
          </p>
        </div>
      )}
    </>
  )
}

export function ZoomableFigureImage({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={624}
      className="max-w-none cursor-zoom-in"
      onClick={() => {
        document.dispatchEvent(
          new CustomEvent<LightboxState>('figure-zoom', {
            bubbles: true,
            detail: { src, alt },
          })
        )
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          document.dispatchEvent(
            new CustomEvent<LightboxState>('figure-zoom', {
              bubbles: true,
              detail: { src, alt },
            })
          )
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Enlarge figure: ${alt}`}
    />
  )
}
