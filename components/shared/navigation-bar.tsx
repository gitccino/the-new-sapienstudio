import {
  fetchAuthMutation,
  fetchAuthQuery,
  isAuthenticated,
} from "@/lib/auth-server";
import { SettingsDialog } from "./settings-dialog";
import { RegisterDialog } from "./register-dialog";
import { api } from "@/convex/_generated/api";
import CreditDialog from "./credit-dialog";

export default async function NavigationBar() {
  const authed = await isAuthenticated();

  const balanceResult = await fetchAuthQuery(
    api.functions.credits.getBalance,
    {},
  );
  if (balanceResult.status === "not_found") {
    await fetchAuthMutation(api.functions.credits.initializeWallet, {});
  }

  return (
    <div className="px-[5%] md:px-16 py-1.5 fixed h-fit left-0 right-0 flex-row-between max-w-3xl mx-auto">
      <div>
        <CreditDialog />
      </div>

      <div className="space-x-1">
        <SettingsDialog authed={authed} />

        {!authed && <RegisterDialog />}
      </div>
    </div>
  );
}
