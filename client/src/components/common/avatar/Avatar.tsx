"use client";
import { setUsers } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { socket } from "@/socket";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Avatar = () => {
  // const { users } = useUsers();
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("users-list", (users) => {
      dispatch(setUsers(users));
      return () => socket.off("users-list");
    });
  }, [socket]);
  return (
    <div className="absolute gap-2 right-6 top-1/2">
      {users.map((user, index) => (
        <div
          key={`${user.name}-${index}`}
          className="flex items-center gap-2 text-xs md:text-base"
        >
          <div
            style={{ backgroundColor: user.color }}
            className="h-3 w-3 rounded-full"
          ></div>
          <div className="font-bold text-primary"> {user.name} </div>
        </div>
      ))}
    </div>
  );
};
