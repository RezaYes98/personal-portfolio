'use client'

import { Dialog } from '@base-ui/react/dialog'

export function FigureDialog({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  const parsed = alt.match(/^(Fig\. \d+)([\s\S]*)$/)
  const title = parsed ? parsed[1] : 'Figure'
  const rest = parsed ? parsed[2] : alt

  return (
    <Dialog.Root>
      <Dialog.Trigger className="block max-w-none cursor-zoom-in">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width={624}
          className="max-w-none"
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#fdfcfc]/[0.97]" />
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-6">
          <Dialog.Popup className="relative flex max-w-full flex-col items-center">
            <Dialog.Title className="sr-only">{alt}</Dialog.Title>
            <Dialog.Close className="t-micro mb-2 self-end text-smoke transition-colors hover:text-graphite">
              close
            </Dialog.Close>
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="max-h-[80vh] w-auto max-w-full"
            />
            <Dialog.Description className="t-body mt-3 max-w-xl text-center text-sm text-smoke">
              <span className="font-medium text-graphite">{title}</span>
              {rest}
            </Dialog.Description>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
