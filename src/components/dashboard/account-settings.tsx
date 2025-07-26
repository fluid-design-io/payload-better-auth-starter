"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  AuthCard,
  PasskeysCard,
  SessionsCard,
  SignedIn,
  SignedOut,
} from "@daveyplate/better-auth-ui";
import { AlertCircleIcon, FormInputIcon, Lock, User } from "lucide-react";

import {
  ChangeEmailCard,
  ChangePasswordCard,
  DeleteAccountCard,
  UpdateNameCard,
} from "@daveyplate/better-auth-ui";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//TODO: use Activity from react when Next 16 is released
// import { unstable_Activity as Activity, useState } from "react";
import { useHash } from "@/hooks/use-hash";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";

//TODO: use Activity from react when Next 16 is released
const Activity = ({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: "visible" | "hidden";
}) => {
  if (mode === "visible") return children;
  return null;
};

const data = [
  { name: "Account", icon: User },
  { name: "Security", icon: Lock },
  { name: "Password", icon: FormInputIcon },
] as const;

type AccountTab = (typeof data)[number]["name"];

export function AccountSettings({ modal = true }: { modal?: boolean }) {
  const [activeTab, setActiveTab] = useState<AccountTab>("Account");
  const params = useSearchParams();
  const message = params.get("message");
  const { hash } = useHash();
  useEffect(() => {
    if (hash) {
      if (hash.startsWith("#account/")) {
        const tab = decodeURIComponent(hash.split("/")[1]) as AccountTab;
        if (data.some((item) => item.name === tab)) {
          setActiveTab(tab);
        }
      }
    }
  }, [hash]);
  return (
    <>
      <SignedIn>
        <SidebarProvider
          style={
            {
              "--sidebar-width": modal ? "14rem" : "16rem",
              "--sidebar-width-mobile": "12rem",
            } as React.CSSProperties
          }
        >
          <Sidebar collapsible='none' className='hidden md:flex h-auto'>
            <SidebarContent className='p-6'>
              <SidebarGroup className='p-0'>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={item.name === activeTab}
                          onClick={() => {
                            window.location.hash = `#account/${encodeURIComponent(item.name)}`;
                          }}
                          autoFocus={item.name === activeTab}
                        >
                          <item.icon className='size-4' />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main
            className={cn(
              "flex flex-1 flex-col h-screen overflow-hidden",
              "max-h-[calc(100vh-6rem)]",
              modal && "md:h-[600px]"
            )}
          >
            <header className='flex h-16 md:hidden shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
              <div className='flex items-center gap-2 px-6'>
                <Select
                  value={activeTab}
                  onValueChange={(value) => {
                    window.location.hash = `#account/${encodeURIComponent(value)}`;
                  }}
                >
                  <SelectTrigger className='w-[200px] font-bold'>
                    <SelectValue
                      placeholder='Select a tab'
                      defaultValue={activeTab}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {data.map((item) => (
                      <SelectItem key={item.name} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </header>
            {message && (
              <Alert variant='secondary'>
                <AlertCircleIcon />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <div className='flex flex-1 flex-col gap-4 px-6 md:p-8 overflow-y-auto'>
              <Activity mode={activeTab === "Account" ? "visible" : "hidden"}>
                <div className='flex flex-col gap-4'>
                  {/* <UpdateAvatarCard /> */}

                  <UpdateNameCard />

                  {/* <UpdateUsernameCard /> */}

                  <ChangeEmailCard />
                </div>
              </Activity>
              <Activity mode={activeTab === "Security" ? "visible" : "hidden"}>
                <div className='flex flex-col gap-4'>
                  <PasskeysCard />

                  <SessionsCard />

                  <DeleteAccountCard />
                </div>
              </Activity>
              <Activity mode={activeTab === "Password" ? "visible" : "hidden"}>
                <div className='flex flex-col gap-4'>
                  <ChangePasswordCard />
                </div>
              </Activity>
            </div>
          </main>
        </SidebarProvider>
      </SignedIn>
      <SignedOut>
        <div className='flex justify-center items-center py-6'>
          <AuthCard view='SIGN_IN' />
        </div>
      </SignedOut>
    </>
  );
}
