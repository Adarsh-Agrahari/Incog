// pages/my-profile.tsx

"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircleIcon, EnvelopeIcon, InboxIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

interface ProfileData {
  username: string;
  email: string;
  avatar: string;
  isVerified: boolean;
  messagesReceived: number;
  messagesSent: number;
}

const MyProfilePage: React.FC = () => {
  const { data: session } = useSession()

  // In a real application, you would fetch this data from your API
  const profileData: ProfileData = {
    username: session?.user?.name || "User",
    email: session?.user?.email || "user@example.com",
    avatar: session?.user?.image || "/default-avatar.png",
    isVerified: true, // This should come from your backend
    messagesReceived: 1234, // This should come from your backend
    messagesSent: 5678, // This should come from your backend
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profileData.avatar} alt={profileData.username} />
            <AvatarFallback>{profileData.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl flex items-center">
              {profileData.username}
              {profileData.isVerified && (
                <CheckCircleIcon className="w-5 h-5 text-blue-500 ml-2" />
              )}
            </CardTitle>
            <div className="flex items-center text-gray-500 mt-1">
              <EnvelopeIcon className="w-4 h-4 mr-2" />
              {profileData.email}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around mt-4">
            <div className="text-center">
              <div className="font-bold text-xl">{profileData.messagesReceived}</div>
              <div className="text-gray-500 flex items-center justify-center">
                <InboxIcon className="w-4 h-4 mr-1" />
                Received
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl">{profileData.messagesSent}</div>
              <div className="text-gray-500 flex items-center justify-center">
                <PaperAirplaneIcon className="w-4 h-4 mr-1" />
                Sent
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/editprofile">
              <Button className="w-full">Edit Profile</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MyProfilePage