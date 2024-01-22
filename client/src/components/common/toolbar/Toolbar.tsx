"use client";
import { Button } from "@/components/ui/button";
import { MENU_ITEMS } from "@/constants";
import { menuItemClick } from "@/redux/slices/menuSlice";
import { RootState } from "@/redux/store";
import { socket } from "@/socket";
import { Eraser, LucideProps, Pencil, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Toolbar = () => {
  const dispatch = useDispatch();
  const activeMenu = useSelector(
    (state: RootState) => state.menu.activeMenuItem
  );

  const handleMenuClick = (name: string) => {
    dispatch(menuItemClick(name));
  };
  const handleReset = () => {
    if (socket.connected) socket.emit("clear");
    else window.location.reload();
  };
  const iconProps: LucideProps = {
    strokeWidth: 3,
    size: 20,
  };
  return (
    <div className="relative md:absolute md:left-1/2 mx-2 top-1 md:top-6 md:-translate-x-1/2 flex gap-3 flex-wrap justify-center border border-primary py-2 px-3 rounded-lg">
      <Button
        size="sm"
        variant="link"
        onClick={() => handleMenuClick(MENU_ITEMS.BRUSH)}
        className={
          activeMenu === MENU_ITEMS.BRUSH
            ? "bg-active hover:bg-active text-white"
            : ""
        }
      >
        <Pencil {...iconProps} />
      </Button>
      <Button
        size="sm"
        variant="link"
        onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
        className={
          activeMenu === MENU_ITEMS.ERASER
            ? "bg-active hover:bg-active text-white"
            : ""
        }
      >
        <Eraser {...iconProps} />
      </Button>

      <Button size="sm" variant="destructive" onClick={handleReset}>
        <X {...iconProps} />
      </Button>
    </div>
  );
};

export default Toolbar;
