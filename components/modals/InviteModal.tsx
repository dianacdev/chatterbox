"use client";

import { useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal-store";
import { useOrgin } from "@/hooks/use-orgin";

import { Check, Copy, RefreshCw } from "lucide-react";


export const InviteModal = () => {
  const {onOpen,isOpen, onClose, type, data} = useModal();
  const origin = useOrgin()

  const isModalOpen = isOpen && type === "invite"

  const {server} = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onCopy = () =>{
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true)
    setTimeout(()=>{
      setCopied(false)
    }, 1000);
  }

  const onNew = async()=>{
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      
      onOpen("invite",{server: response.data});
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }


  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#F8F8FF] text-neutral-950 p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold ">
            Invite friends to {server?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Or Send a Server Invite Link To a Friend
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
              value ={inviteUrl}
              disabled={isLoading}
            />
            <Button size="icon" onClick={onCopy} className="hover:scale-105 hover:text-blue-500"disabled={isLoading}>
              {copied
                ?<Check className="w-4 h-4 text-blue-500"/>
                :<Copy className="w-4 h-4"/>
              }
            </Button>
          </div>
          <Button
            onClick={onNew}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4 hover:underline hover:text-blue-500"
            disabled={isLoading}
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2"/>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
