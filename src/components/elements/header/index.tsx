import { MenuPage } from "@/components/elements/menu"
import { withAuth } from "@/components/elements/with-auth"

const beforeHeader = () => {
  return (
    <div className="p-2 bg-[#8478bf] text-white pr-4">
      <MenuPage></MenuPage>
    </div>
  );
}

export const Header = withAuth(beforeHeader);