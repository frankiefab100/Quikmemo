import { SessionProvider, useSession } from "next-auth/react";
import UserDropdown from "./UserDropdown";

const UserAccount = () => {
  const { data: session } = useSession();

  return (
    <SessionProvider>
      <div className="flex justify-between items-center mx-4">
        {session?.user && (
          <UserDropdown
            userImage={session.user.image ?? null}
            userName={session.user.name ?? ""}
            userEmail={session.user.email ?? ""}
          />
        )}
      </div>
    </SessionProvider>
  );
};

export default UserAccount;
