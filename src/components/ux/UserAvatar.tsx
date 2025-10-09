import React from 'react'
import { Avatar } from "@chakra-ui/react"

interface AvatarProps {
  name?:string;
  imgURL?:string
}

const UserAvatar = ({name, imgURL}:AvatarProps) => {
  return (
    <Avatar.Root boxShadow={'xl'}>
      <Avatar.Fallback name={name} />
      <Avatar.Image src={imgURL} />
    </Avatar.Root>
  )
}

export default UserAvatar
