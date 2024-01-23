"use client";

import { Slider } from "@/components/ui/slider";
import { MENU_ITEMS } from "@/constants";
import { brushColorChange, brushSizeChange } from "@/redux/slices/optionsSlice";
import { RootState } from "@/redux/store";
import { socket } from "@/socket";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

const Options = () => {
  const activeMenu = useSelector(
    (state: RootState) => state.menu.activeMenuItem
  );
  const { brushColor, brushSize } = useSelector(
    (state: RootState) => state.options
  );
  const dispatch = useDispatch();
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(brushColorChange(e.target.value));
    socket.emit("update-user", { color: brushColor, socketId: socket.id });
  };
  const handleBrushSizeChange = (e: number[]) => {
    dispatch(brushSizeChange(e[0]));
  };
  return (
    <div className="md:absolute flex flex-row md:flex-col justify-evenly mx-2 mt-2 gap-3 left-0 md:top-1/3 px-3 md:left-6 lg:left-12 border border-primary py-3 rounded-lg min-w-[200px]">
      {activeMenu === MENU_ITEMS.BRUSH && (
        <div className="flex flex-col md:flex-row items-center md:gap-6">
          <dt>Color:</dt>
          <input
            type="color"
            name="color"
            value={brushColor}
            className="md:h-12 md:w-12 bg-transparent border border-primary rounded"
            onChange={handleColorChange}
          />
        </div>
      )}
      <div className="flex flex-col gap-2 ">
        <dt>
          {activeMenu === MENU_ITEMS.ERASER ? "Eraser Size:" : "Brush Size:"}
        </dt>
        <Slider
          max={10}
          value={[brushSize]}
          onValueChange={handleBrushSizeChange}
          color={brushColor}
        />
      </div>
    </div>
  );
};

export default Options;
