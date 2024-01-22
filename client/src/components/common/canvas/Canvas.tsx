"use client";

import { FC, useEffect, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import { drawLine } from "@/utils/drawLine";
import { socket } from "@/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { BACKGROUND_COLOR, MENU_ITEMS } from "@/constants";

interface PageProps {}

type DrawLineProps = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
  brushSize: number;
};

const Page: FC<PageProps> = ({}) => {
  const [color, setColor] = useState<string>("#000");
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  const { brushColor, brushSize } = useSelector((state: RootState) => state.options);
  const { activeMenuItem } = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    if (activeMenuItem === MENU_ITEMS.ERASER) setColor(BACKGROUND_COLOR);
    else setColor(brushColor);
  }, [brushColor, activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    canvasRef.current.height = window.innerHeight;
    canvasRef.current.width = window.innerWidth;

    socket.emit("frontend-connected");

    socket.on("ready-to-recieve", () => {
      if (!canvasRef.current?.toDataURL()) return;
      socket.emit("canvas-state", canvasRef.current?.toDataURL());
    });

    socket.on("canvas-state-from-server", (state: string) => {
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });

    socket.on(
      "draw-line",
      ({ prevPoint, currentPoint, color, brushSize }: DrawLineProps) => {
        if (!ctx) return;
        drawLine({ prevPoint, currentPoint, ctx, color, brushSize });
      }
    );

    socket.on("clear", clear);

    return () => {
      socket.off("ready-to-recieve");
      socket.off("canvas-state-from-server");
      socket.off("draw-line");
      socket.off("clear");
    };
  }, [canvasRef]);

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit("draw-line", { prevPoint, currentPoint, color, brushSize });
    drawLine({ prevPoint, currentPoint, ctx, color, brushSize });
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <canvas onMouseDown={onMouseDown} ref={canvasRef} style={{
        backgroundColor: BACKGROUND_COLOR
      }} />
    </div>
  );
};

export default Page;
