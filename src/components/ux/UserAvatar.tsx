import React from 'react'
import { Avatar } from "@chakra-ui/react"

interface AvatarProps {
  name?:string;
}

const UserAvatar = ({name}:AvatarProps) => {
  return (
    <Avatar.Root boxShadow={'xl'}>
      <Avatar.Fallback name={name} />
      <Avatar.Image />
    </Avatar.Root>
  )
}

export default UserAvatar
