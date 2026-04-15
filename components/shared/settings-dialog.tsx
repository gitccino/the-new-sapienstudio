"use client";

import {
  Settings03Icon,
  SunriseIcon,
  SunsetIcon,
  TransactionHistoryIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Splitter } from "./splitter";
import { useTheme } from "next-themes";

const historyOptions: { key: string; icon: IconSvgElement; label: string }[] = [
  {
    key: "download-history",
    icon: TransactionHistoryIcon,
    label: "Download History",
  },
  {
    key: "purchase-history",
    icon: TransactionHistoryIcon,
    label: "Purchase History",
  },
];

type SettingsDialogProps = {
  authed: boolean;
};

export function SettingsDialog({ authed }: SettingsDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="xl">
          <HugeiconsIcon icon={Settings03Icon} strokeWidth={1.5} />
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="ring-0 p-6 max-md:w-[85%]"
      >
        <DialogHeader>
          <DialogTitle className="mb-4 font-medium">User Settings</DialogTitle>
        </DialogHeader>

        <div className="flex-col-start gap-1">
          <span className="text-muted-foreground text-xs">Preferences</span>
          <Button
            variant="secondaryCard"
            size="2xl"
            className="w-full justify-start! font-normal"
            onClick={toggleTheme}
          >
            <HugeiconsIcon
              strokeWidth={1.8}
              icon={theme === "dark" ? SunriseIcon : SunsetIcon}
              className="text-muted-foreground"
            />
            Switch to {theme === "dark" ? "Light" : "Dark"}
          </Button>
        </div>
        {authed && (
          <>
            <div className="flex-col-start gap-1">
              <span className="text-muted-foreground text-xs">History</span>
              {historyOptions.map(({ key, label, icon: Icon }) => (
                <Button
                  variant="secondaryCard"
                  size="2xl"
                  key={key}
                  className="w-full justify-start! font-normal"
                >
                  <HugeiconsIcon
                    icon={Icon}
                    className="text-muted-foreground"
                  />
                  {label}
                </Button>
              ))}
            </div>

            <Splitter className="bg-splitter-card" />

            <Button
              variant="destructive"
              size="2xl"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      setOpen(false);
                      router.refresh();
                    },
                  },
                })
              }
            >
              Sign out
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
