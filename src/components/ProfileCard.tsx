"use client"

import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CheckCircleIcon, EnvelopeIcon, InboxIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

interface Profile {
  id: number;
  username: string;
  title: string;
  avatar: string;
  email: string;
  messagesReceived: number;
  messagesSent: number;
  isVerified: boolean;
  link: string;
}

const ProfileCard: React.FC<{ profile: Profile }> = ({ profile }) => (
  <Card className="w-full max-w-md mx-auto"> {/* Adjust width here */}
    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
      <Avatar className="w-20 h-20">
        <AvatarImage src={profile.avatar} alt={profile.username} />
        <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="overflow-hidden">
        <CardTitle className="text-2xl flex items-center">
          {profile.username}
          {profile.isVerified && (
            <CheckCircleIcon className="w-5 h-5 text-blue-500 ml-2" />
          )}
        </CardTitle>
        <div className="flex items-center text-gray-500 mt-1">
          <EnvelopeIcon className="w-4 h-4 mr-2" />
          {profile.email}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex justify-around mt-4">
        <div className="text-center">
          <div className="font-bold text-xl">{Math.floor(Math.random() * (199 - 10 + 1)) + 10}</div>
          <div className="text-gray-500 flex items-center justify-center">
            <InboxIcon className="w-4 h-4 mr-1" />
            Received
          </div>
        </div>
        <div className="text-center">
          <div className="font-bold text-xl">{Math.floor(Math.random() * (199 - 10 + 1)) + 10}</div>
          <div className="text-gray-500 flex items-center justify-center">
            <PaperAirplaneIcon className="w-4 h-4 mr-1" />
            Sent
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Link href={`/u/${profile.username}`}>
          <Button className="w-full">View Profile</Button>
        </Link>
      </div>
    </CardContent>
  </Card>
)

export default ProfileCard
