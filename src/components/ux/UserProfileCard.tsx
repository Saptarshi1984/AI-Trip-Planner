"use client";
import { useRef } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import { account, storage, ID } from "@/lib/appwrite.client";


type profileProps = {
  profileURL: string;
};

const UserProfileCard = ({ profileURL }: profileProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const openPicker = () => fileRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Max file size is 5MB.");
      return;
    }

    try {

      const user = await account.get();

      const created = await storage.createFile({
        bucketId: '68f3767f0039fe2334f3',
        fileId: ID.unique(),
        file
      })
      
    } catch (error) {
      
    }
    console.log("selected:", file.name);
  };
  return (
    <div className="relative">
      <Image
        className="!border-1 !border-gray-200 rounded-2xl"
        width={150}
        height={200}
        alt="profile image"
        src={profileURL}
      />
      <button type="button" onClick={openPicker}>
      <span className="absolute left-30 bottom-30 hover:cursor-pointer hover:text-gray-600"><FaCamera /></span>  
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />
    </div>
  );
};

export default UserProfileCard;
