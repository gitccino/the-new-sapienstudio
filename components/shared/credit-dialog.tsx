"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  AiImageIcon,
  GiftIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { memo, useState } from "react";
import { CREDIT_OPTIONS } from "@/constants/billing";
import { cn } from "@/lib/utils";
import { Splitter } from "./splitter";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CreditDialog() {
  const balanceResult = useQuery(api.functions.credits.getBalance);

  if (!balanceResult || balanceResult.status !== "success") return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="xl">
          <HugeiconsIcon icon={Wallet01Icon} />
          <span>{balanceResult.balance}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="ring-0 p-6 max-md:w-[85%] gap-2"
      >
        <DialogHeader>
          <DialogTitle className="mb-4 font-medium">Your Wallet</DialogTitle>
        </DialogHeader>

        <div className="h-12 px-4 rounded-md border-2 flex flex-row justify-start items-center gap-2">
          <HugeiconsIcon icon={Wallet01Icon} />
          <span>{balanceResult.balance} Credits</span>
        </div>

        <BuyMoreCredits />
        <Splitter className="bg-splitter-card" />
        <CreditDaily />
      </DialogContent>
    </Dialog>
  );
}

const BuyMoreCredits = memo(function BuyMoreCredits() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedOption = CREDIT_OPTIONS[selectedIndex];
  return (
    <>
      <div className="flex flex-row justify-around gap-2">
        {CREDIT_OPTIONS.map((option, index) => (
          <button
            type="button"
            key={`credit-option-${option.id}`}
            className={cn(
              "w-full border-2 border-transparent rounded-md p-2 flex flex-col gap-1",
              selectedIndex === index && "border-border",
            )}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="flex flex-row items-center justify-center gap-1 text-credit">
              <HugeiconsIcon icon={AiImageIcon} size={16} />
              <span>{option.credit}</span>
            </div>
            <span>${option.price}</span>
            <span className="text-muted-foreground text-[.6rem]">
              ${(option.price / option.credit).toFixed(3)}/credit
            </span>
          </button>
        ))}
      </div>
      <Button variant="secondaryCard" size="2xl" className="font-normal">
        Buy {selectedOption.credit} credits
      </Button>
    </>
  );
});

const CreditDaily = memo(function CreditDaily() {
  return (
    <div>
      <Button
        variant="none"
        size="2xl"
        className="w-full bg-credit text-secondary-button font-normal"
      >
        <HugeiconsIcon icon={GiftIcon} />
        Claim daily reward
      </Button>
      <span className="text-muted-foreground px-1 text-[.7rem]">
        ** Check back daily to claim free credit
      </span>
    </div>
  );
});
