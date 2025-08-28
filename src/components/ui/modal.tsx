'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'

import { cn } from '@/lib/utils'

import { useIsMobile } from '@/hooks/use-mobile'

export interface ModalProps {
  children: React.ReactNode
  description?: null | string
  desktopClassName?: {
    content?: string
    overlay?: string
  }
  onOpenChange: (isOpen: boolean) => void
  open: boolean
  title: React.ReactNode | string
  scrollable?: boolean
}

function Modal({
  children,
  description,
  desktopClassName,
  onOpenChange,
  open,
  title,
  scrollable = true,
}: ModalProps) {
  const isDesktop = !useIsMobile()
  if (isDesktop) {
    return (
      <Dialog onOpenChange={onOpenChange} open={open}>
        <DialogContent
          className={cn(
            'rounded-4xl p-0 h-[calc(100svh-100px)] md:max-h-[calc(100svh-120px)] md:max-w-[700px] xl:max-w-[1200px] overflow-hidden',
            desktopClassName?.content
          )}
          overlayClassName={cn(desktopClassName?.overlay)}
        >
          {typeof title === 'string' ? (
            <DialogTitle className="sr-only text-lg">{title}</DialogTitle>
          ) : (
            title
          )}
          {description && <DialogDescription className="sr-only">{description}</DialogDescription>}

          {scrollable ? (
            <ScrollArea className="max-h-[calc(100svh-100px)] md:max-h-[calc(100svh-120px)]">
              {children}
            </ScrollArea>
          ) : (
            children
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer onOpenChange={onOpenChange} open={open}>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[98svh]">
        <DrawerHeader className="text-left sr-only">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {scrollable ? <ScrollArea className="overflow-y-auto">{children}</ScrollArea> : children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="min-w-48" variant="outline" size="sm" type="button">
              <span className="opacity-75">Dismiss</span>
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default Modal
