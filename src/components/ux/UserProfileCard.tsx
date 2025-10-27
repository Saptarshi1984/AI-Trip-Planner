/* "use client";
import { useRef } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import { account, storage, tablesDB, ID } from "@/lib/appwrite.client";
import { Permission, Role } from "appwrite";

type profileProps = {
  profileURL: string;
};

const UserProfileCard = ({ profileURL }: profileProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const openPicker = () => fileRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const user = await account.get();

    const created = await storage.createFile({
      bucketId: "68f3767f0039fe2334f3",
      fileId: ID.unique(),
      file,
      permissions: [
        Permission.read(Role.any()),
        Permission.write(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
        Permission.delete(Role.user(user.$id)),
      ],
    });

    const previewUrl =  storage.getFilePreview({
    bucketId: '68f3767f0039fe2334f3',
    fileId: ID.unique(),
});

    await tablesDB.updateRow({
      databaseId: "68ea1c19002774b84c21",
      tableId: "user_profiles",
      rowId: user.$id,
      data: {
        profilePictureURL: previewUrl,
      },
    });
  };
  return (
    <div className="relative">
      <Image
        className="!border-1 !border-gray-200 rounded-2xl"
        width={150}
        height={200}
        alt="profile image"
        src={profileURL.trim() !== "" ? profileURL : '/noProfile'}
        priority
      />
      <button type="button" onClick={openPicker}>
        <span className="absolute left-30 bottom-30 hover:cursor-pointer hover:text-gray-600">
          <FaCamera />
        </span>
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

export default UserProfileCard; */
