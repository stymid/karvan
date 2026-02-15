"use client";
import { CameraAddIcon } from "@/components/icons/camera-add-icon";

import { GalleryEditIcon } from "@/components/icons/gallery-edit-icon";
import { GalleryIcon } from "@/components/icons/gallery-icon";
import { GalleryRemoveIcon } from "@/components/icons/gallery-remove-icon";
import { createClient } from "@/utils/supabase/client";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Skeleton } from "@heroui/skeleton";
import Cropper from "react-easy-crop";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import NextImage from "next/image";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { addToast, closeAll } from "@heroui/toast";
import { loadImage } from "@/utils/load-image";

const AvatarUploader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const supabase = createClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [avatarDBPath, setAvatarDBPath] = useState<string | undefined>(
    undefined,
  );
  const [userId, setUserId] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [avatarError, setAvatarErrors] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const publicAvatarURL = useMemo(() => {
    if (avatarDBPath) {
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(avatarDBPath);
      return data.publicUrl;
    }
  }, [avatarDBPath]);

  const {
    isOpen: isOpenPreview,
    onOpen: onOpenPreview,
    onClose: onClosePreview,
  } = useDisclosure();

  useEffect(() => {
    async function getDefaultAvatarURL() {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!user?.id) return;
      setUserId(user.id);
      setIsDownloading(true);

      if (!user.id) return;

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .maybeSingle();
        if (error?.message) {
          throw new Error(`${error.message} with code ${error.cause}`);
        }
        if (profile?.avatar_url) setAvatarDBPath(profile?.avatar_url);
      } catch (err) {
        setAvatarErrors("an error ecured during fetching avatar");
      } finally {
        setIsDownloading(false);
      }
    }
    getDefaultAvatarURL();
  }, []);
  useEffect(() => {
    async function getAvatarURL() {
      if (!userId) return;

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", userId)
          .maybeSingle();
        if (error?.message) {
          throw new Error(`${error.message} with code ${error.cause}`);
        }

        if (profile?.avatar_url) setAvatarDBPath(profile?.avatar_url);
      } catch (err) {
        setAvatarErrors("an error ecured during fetching avatar");
      }
    }
    getAvatarURL();
  }, [userId]);
  useEffect(() => {}, []);

  return (
    <div className="flex justify-center p-2">
      <div className="flex flex-col gap-3">
        <button
          disabled={isDeleting || isUploading}
          className="group relative max-w-min hover:cursor-pointer"
          type="button"
          onClick={(e) => {
            inputRef.current?.click();
          }}
        >
          <Avatar
            classNames={{
              base: "bg-linear-to-br from-[#FFB457] to-[#FF705B] brightness-80 grayscale-40",
            }}
            fallback={
              isDownloading ? (
                <Skeleton className="block w-14 h-14 rounded-full" />
              ) : undefined
            }
            size="lg"
            src={publicAvatarURL}
          />
          {isUploading ? (
            <Spinner
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-white"
              color="default"
            />
          ) : publicAvatarURL ? (
            <GalleryEditIcon className="hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-white text-white" />
          ) : (
            <CameraAddIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-white" />
          )}
        </button>
        <input
          disabled={isDeleting || isUploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const objectUrl = URL.createObjectURL(file);

            setPreviewUrl(objectUrl);
            setSelectedFile(file);
            onOpenPreview();
          }}
          ref={inputRef}
          className="hidden"
          type="file"
        />
        <div className="flex justify-between">
          {/* delete profile */}
          <button
            className="hover:cursor-pointer"
            disabled={!avatarDBPath}
            onClick={async () => {
              setIsDeleting(true);
              async function deleteAvatar(userId: string) {
                try {
                  if (avatarDBPath) {
                    const { error, data } = await supabase.storage
                      .from("avatars")
                      .remove([avatarDBPath]);
                    return { data, error };
                  } else return { error: null };
                } catch (err) {
                  return { error: "unknown error" };
                }
              }
              if (!userId) return;
              const resultPro = deleteAvatar(userId);
              addToast({
                description: "درحال حذف",
                isClosing: false,
                promise: new Promise((res, rej) => {
                  resultPro.then(() => {
                    res(true);
                  });
                }),
              });
              const result = await resultPro;
              if (result.error) {
                return addToast({
                  description: "حذف نشد.",
                  color: "danger",
                });
              }
              await supabase
                .from("profiles")
                .update({
                  avatar_url: null,
                })
                .eq("id", userId);
              closeAll();
              addToast({
                description: "حذف با موفقیت انجام شد",
                color: "success",
                timeout: 3000,
              });
              deleteAvatar(userId);
              setPreviewUrl(undefined);
              setAvatarDBPath(undefined);
              setSelectedFile(null);
              setIsDeleting(false);
            }}
          >
            <GalleryRemoveIcon className="fill-black dark:fill-white" />
          </button>
          <button className="hover:cursor-pointer" onClick={onOpen}>
            <GalleryIcon />
          </button>
        </div>
      </div>
      <Modal isOpen={isOpenPreview} onClose={onClosePreview}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ایا از انتخاب اواتار خود مطمئن هستید؟{" "}
              </ModalHeader>
              <ModalBody>
                <div className="relative h-80 overflow-clip">
                  <div className="">
                    <Cropper
                      image={previewUrl || ""}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={(_, croppedAreaPixels) => {
                        setCroppedAreaPixels(croppedAreaPixels);
                      }}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  disabled={isDeleting || isUploading}
                  color="danger"
                  variant="light"
                  onPress={async () => {
                    if (inputRef.current) {
                      inputRef.current.value = "";
                    }
                    setPreviewUrl(undefined);
                    setSelectedFile(null);
                    onClose();
                  }}
                >
                  خیر
                </Button>
                <Button
                  disabled={isDeleting || isUploading}
                  color="primary"
                  onPress={async () => {
                    if (!croppedAreaPixels || !previewUrl) return;
                    setIsUploading(true);

                    const image = await loadImage(previewUrl);
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return;

                    const { x, y, width, height } = croppedAreaPixels;

                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(
                      image,
                      x,
                      y,
                      width,
                      height, // ← sX, sY, sWidth, sHeight
                      0,
                      0,
                      width,
                      height, // ← dX, dY, dWidth, dHeight
                    );
                    async function uploadAvatar(file: File, userId: string) {
                      const fileExt = file.name.split(".").pop();
                      const filePath = `${userId}/avatar_${Date.now()}.${fileExt}`;

                      const { error: errorStorage, data: dataStorage } =
                        await supabase.storage
                          .from("avatars")
                          .upload(filePath, file, {
                            cacheControl: "3600",
                            upsert: false,
                          });

                      if (errorStorage) {
                        addToast({
                          description: errorStorage.message,
                          color: "danger",
                        });

                        return { errorStorage };
                      }

                      const { data, error } = await supabase
                        .from("profiles")
                        .upsert(
                          {
                            id: userId,
                            avatar_url: dataStorage.path,
                          },
                          { onConflict: "id" },
                        )
                        .select("id, avatar_url")
                        .single();

                      if (error) return { error };
                      if (avatarDBPath) {
                        await supabase.storage
                          .from("avatars")
                          .remove([avatarDBPath]);
                      }

                      setAvatarDBPath(data.avatar_url);
                      if (inputRef.current) inputRef.current.value = "";
                      setPreviewUrl(undefined);
                      setSelectedFile(null);
                      setIsUploading(false);
                      return filePath;
                    }
                    canvas.toBlob(async (blob) => {
                      if (!blob) return;

                      const croppedFile = new File(
                        [blob],
                        selectedFile?.name || "avatar.jpg",
                        { type: "image/jpeg" },
                      );

                      if (userId) await uploadAvatar(croppedFile, userId);
                    }, "image/jpeg");

                    onClose();
                  }}
                >
                  بله
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <NextImage
                className="w-full"
                width={200}
                height={200}
                src={publicAvatarURL || ""}
                alt="avatar-modal"
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AvatarUploader;
