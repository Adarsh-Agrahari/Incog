'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation'; // Import useParams
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast'; // Import useToast

interface ApiResponse {
  success: boolean;
  code: string;
  message?: string;
}

const PublicProfileLink: React.FC = () => {
  const [content, setMessage] = useState<string>('');
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const params = useParams(); // Use useParams to get route parameters
  const username = params.username; // Extract username from params

  const { toast } = useToast(); // Initialize useToast

  const fetchSuggestedMessages = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/suggest-messages');
      console.log('Fetched suggested messages response:', response.data);

      if (response.data.success) {
        setSuggestedMessages(response.data.code.split(' || '));
        toast({
          title: "Success",
          description: "Suggested messages fetched successfully.",
          variant: "default"
        });
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to fetch suggested messages.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error fetching suggested messages:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while fetching suggested messages.",
        variant: "destructive"
      });
    }
  };

  const handleSendMessage = async () => {
    if (!username) {
      toast({
        title: "Error",
        description: "Username is not defined.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await axios.post<ApiResponse>('/api/send-message', { username, content });
      if (response.data.success) {
        toast({
          title: "Message Sent",
          description: "Your message was sent successfully.",
          variant: "default"
        });
        setMessage(''); // Clear message input after sending
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to send message.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while sending your message.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="my-4 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className='text-4xl font-bold mb-4'>Public Profile Link</h1>
      <Card>
        <CardHeader>
          <CardTitle>Send Anonymous Message to @{username}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input 
              type="text"
              placeholder="Write your anonymous message here"
              value={content}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button onClick={handleSendMessage}>Send It</Button>

          <div className="mt-6">
            <Button variant="secondary" onClick={fetchSuggestedMessages}>Suggest Messages</Button>
          </div>
          
          <div className="mt-4">
            <p>Click on any message below to select it.</p>
            <div className="mt-2">
              {suggestedMessages.map((msg, index) => (
                <div
                  key={index}
                  className="p-2 mt-2 bg-gray-100 rounded cursor-pointer"
                  onClick={() => setMessage(msg)}
                >
                  {msg}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 text-center">
        <Button>Create Your Account</Button>
      </div>
    </div>
  );
};

export default PublicProfileLink;
