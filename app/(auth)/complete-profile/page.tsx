"use client";
import { CameraAddIcon } from "@/components/icons/camera-add-icon";

import { GalleryEditIcon } from "@/components/icons/gallery-edit-icon";
import { GalleryIcon } from "@/components/icons/gallery-icon";
import { GalleryRemoveIcon } from "@/components/icons/gallery-remove-icon";
import { createClient } from "@/utils/supabase/client";
import { Avatar } from "@heroui/avatar";

import { Modal, ModalContent, useDisclosure } from "@heroui/modal";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CompleteProfile = () => {
  const [avatar, setAvatar] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  useEffect(() => {
    async function g() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const { user } = data;
      console.log(data);

      const { data: h } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .maybeSingle();
      console.log(h);
    }
    g();
  }, []);
  console.log(inputRef.current?.value);
  console.log(avatar, "avatar");

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-3">
        <button
          className="relative max-w-min"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <Avatar
            classNames={{
              base: "bg-linear-to-br from-[#FFB457] to-[#FF705B] brightness-80 grayscale-40",
            }}
            size="lg"
            src={avatar}
          />
          {avatar ? (
            <GalleryEditIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-white" />
          ) : (
            <CameraAddIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-white" />
          )}
        </button>
        <input
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const objectUrl = URL.createObjectURL(file);
            console.log(objectUrl);
            setAvatar(objectUrl);
          }}
          ref={inputRef}
          className="hidden"
          type="file"
        />
        <div className="flex justify-between">
          <button
            onClick={() => {
              setAvatar("");
            }}
          >
            <GalleryRemoveIcon className="fill-black dark:fill-white" />
          </button>

          <button onClick={() => handleOpen()}>
            <GalleryIcon />
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <Image
                className="w-full"
                width={200}
                height={200}
                src={avatar}
                alt="avatar-modal"
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CompleteProfile;
