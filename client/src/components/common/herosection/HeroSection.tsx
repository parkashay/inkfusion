"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { socket } from "@/socket";

const HeroSection = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  const gotoBoard = () => {
    if (!userName) return;
    socket.emit("newUser", { name: userName, color: "#000000" });
    localStorage.setItem("username", userName);
    router.push("/board");
  };
  return (
    <div className=" flex flex-col gap-3 items-center">
      <motion.h1
        animate={{
          x: [200, 0],
          transition: { duration: 0.5, type: "spring", stiffness: 100 },
        }}
        className="bg-text-gradient text-transparent bg-clip-text"
      >
        Welcome to InkFusion
      </motion.h1>
      <motion.p
        animate={{
          x: [-200, 0],
          transition: { duration: 0.5, type: "spring", stiffness: 100 },
        }}
        className="text-primary"
      >
        A free collaborative drawing web application
      </motion.p>
      <motion.div
        animate={{
          y: [50, 0],
          opacity: [0, 1],
          transition: { duration: 0.5 },
        }}
        className="mt-6"
      >
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            aria-label="name"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {userName.length > 0 && (
            <Button onClick={gotoBoard}>JOIN THE DRAWING BOARD </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
