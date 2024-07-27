"use client"

import React from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { User } from "next-auth"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useRouter } from "next/navigation" // Import useRouter

const Navbar = () => {
  const { data: session } = useSession()
  const user: User = session?.user
  const router = useRouter() // Initialize router

  const handleSignOut = async () => {
    await signOut({ redirect: false }) // Sign out without redirecting immediately
    router.push("/") // Programmatically navigate to the homepage
  }

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold text-white tracking-tight">
          Incog :)
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/explore">
            <Button variant="secondary" className="hidden md:inline-flex">
              Explore
            </Button>
          </Link>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || ""} alt={user.name || ""} />
                    <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/myprofile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="secondary">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
