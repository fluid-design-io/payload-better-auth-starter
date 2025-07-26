"use client";

import { useHash } from "@/hooks/use-hash";
import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import Modal from "../ui/modal";

const AccountSettings = dynamic(
  () => import("./account-settings").then((mod) => mod.AccountSettings),
  {
    ssr: false,
    loading: () => (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader2 className='animate-spin' />
      </div>
    ),
  }
);

export function AccountDialog() {
  const [open, setOpen] = useState(false);
  const { hash, removeHash } = useHash();

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      removeHash();
    }
  };
  // if hash is #account, open the dialog
  useEffect(() => {
    if (hash.startsWith("#account")) {
      setOpen(true);
    }
  }, [hash]);

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title='Settings'
      desktopClassName={{
        content:
          "overflow-hidden rounded-4xl p-0 md:max-h-[600px] h-[calc(100vh-6rem)] md:max-w-[700px] lg:max-w-[800px]",
      }}
      scrollable={false}
    >
      <AccountSettings />
    </Modal>
  );
}
