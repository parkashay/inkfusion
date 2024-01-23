"use client";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Avatar } from '@/components/common/avatar/Avatar'
import Canvas from '@/components/common/canvas/Canvas'
import Options from '@/components/common/options/Options'
import Toolbar from '@/components/common/toolbar/Toolbar'
import { socket } from "@/socket";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if(userName) socket.emit("login-user", userName);
    else router.push("/");

    setLoading(false);
  }, [setLoading, router]);
  
  return (
    loading ? <h1>Loading...</h1>: (
      <section>
        <Toolbar />
        <Avatar />
        <Options />
        <Canvas />
    </section>
      )
  )
}

export default Page