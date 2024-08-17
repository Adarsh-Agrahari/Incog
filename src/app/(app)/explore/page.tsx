"use client"
import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProfileCard from "@/components/ProfileCard"
import axios from "axios"

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

interface ApiResponse {
  success: Boolean,
  profiles: Profile[]
}

// Mock data for profiles
// const profiles: Profile[] = [
//   { id: 1, name: "Alice Johnson", title: "Software Engineer", avatar: "/avatars/alice.jpg", email: "alice@example.com", messagesReceived: 50, messagesSent: 30, isVerified: true, link: "/u/alice" },
//   { id: 2, name: "Bob Smith", title: "Product Manager", avatar: "/avatars/bob.jpg", email: "bob@example.com", messagesReceived: 40, messagesSent: 20, isVerified: false, link: "/u/bob" },
//   { id: 3, name: "Carol Williams", title: "UX Designer", avatar: "/avatars/carol.jpg", email: "carol@example.com", messagesReceived: 30, messagesSent: 25, isVerified: true, link: "/u/carol" },
//   { id: 4, name: "David Brown", title: "Data Scientist", avatar: "/avatars/david.jpg", email: "david@example.com", messagesReceived: 60, messagesSent: 35, isVerified: true, link: "/u/david" },
//   { id: 5, name: "Emma Davis", title: "Front-End Developer", avatar: "/avatars/emma.jpg", email: "emma@example.com", messagesReceived: 45, messagesSent: 28, isVerified: false, link: "/u/emma" },
//   // Add more profiles as needed
// ]

const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filter, setFilter] = useState<string>("all")
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const filteredProfiles = profiles?.filter(profile =>
    profile.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === "all" || profile.title.toLowerCase().includes(filter))
  )

  useEffect(()=>{
    async function getProfile() {
      const response = await axios.get<ApiResponse>('/api/profile');
      setProfiles(response.data.profiles)
    }
    getProfile();
  },[]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Explore</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {profiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="md:w-1/2"
            />
            <Select onValueChange={(value: string) => setFilter(value)} defaultValue={filter}>
              <SelectTrigger className="md:w-1/4">
                <SelectValue placeholder="Filter by title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Titles</SelectItem>
                <SelectItem value="engineer">Engineer</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="scientist">Scientist</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProfiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ExplorePage
