import { createContext } from "react";
import { useQueries } from "@/components/hooks/useQueries";
import Cookies from "js-cookie";
import { UserData, userContextProviderProps } from "./interface";

export const UserContext = createContext({});

export function UserContextProvider({ children, ...props }: userContextProviderProps) {
  const { data: userData } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: { Authorization: `Bearer ${Cookies.get("user_token")}` }
  })

  return (
    <UserContext.Provider value={(userData as UserData)} {...props}>
      {children}
    </UserContext.Provider>
  )
}

