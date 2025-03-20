import { getSession } from "@/lib/getSession";
import UserDropdown from "./UserDropdown";

const UserAccount = async () => {
  const session = await getSession();
  return (
    <div className="flex justify-between items-center mx-4">
      {session?.user && (
        <UserDropdown
          userImage={session.user.image ?? null}
          userName={session.user.name ?? ""}
          userEmail={session.user.email ?? ""}
        />
      )}
    </div>
  );
};

export default UserAccount;
