// pages/settings.tsx

"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const SettingsPage: React.FC = () => {
  // General Settings
  const [language, setLanguage] = useState("english")
  const [timezone, setTimezone] = useState("UTC")

  // Appearance Settings
  const [theme, setTheme] = useState("light")
  const [fontSize, setFontSize] = useState(16)

  // Privacy Settings
  const [cookieConsent, setCookieConsent] = useState(true)
  const [dataCollection, setDataCollection] = useState(true)

  // Accessibility Settings
  const [highContrast, setHighContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  // Performance Settings
  const [autoPlayVideos, setAutoPlayVideos] = useState(true)
  const [loadImages, setLoadImages] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your API
    console.log({
      language,
      timezone,
      theme,
      fontSize,
      cookieConsent,
      dataCollection,
      highContrast,
      reduceMotion,
      autoPlayVideos,
      loadImages
    })
    toast({
      title: "Settings updated",
      description: "Website settings have been updated successfully.",
    })
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Website Settings</h1>
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">EST</SelectItem>
                      <SelectItem value="PST">PST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fontSize">Font Size: {fontSize}px</Label>
                  <Slider
                    id="fontSize"
                    min={12}
                    max={24}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cookieConsent">Allow Cookies</Label>
                  <Switch
                    id="cookieConsent"
                    checked={cookieConsent}
                    onCheckedChange={setCookieConsent}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dataCollection">Allow Data Collection</Label>
                  <Switch
                    id="dataCollection"
                    checked={dataCollection}
                    onCheckedChange={setDataCollection}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accessibility">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="highContrast">High Contrast Mode</Label>
                  <Switch
                    id="highContrast"
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="reduceMotion">Reduce Motion</Label>
                  <Switch
                    id="reduceMotion"
                    checked={reduceMotion}
                    onCheckedChange={setReduceMotion}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoPlayVideos">Auto-play Videos</Label>
                  <Switch
                    id="autoPlayVideos"
                    checked={autoPlayVideos}
                    onCheckedChange={setAutoPlayVideos}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="loadImages">Load Images</Label>
                  <Switch
                    id="loadImages"
                    checked={loadImages}
                    onCheckedChange={setLoadImages}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <Button type="submit" className="mt-6">Save All Changes</Button>
        </form>
      </Tabs>
    </div>
  )
}

export default SettingsPage