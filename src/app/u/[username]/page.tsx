'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ApiResponse {
  success: boolean;
  code: string;
}

const PublicProfileLink: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);

  const fetchSuggestedMessages = async () => {
    try {
      const response = await axios.post<ApiResponse>('http://localhost:3000/api/suggest-messages');
      console.log('Fetched suggested messages response:', response.data);
      if (response.data.success) {
        setSuggestedMessages(response.data.code.split(' || '));
      }
    } catch (error) {
      console.error('Error fetching suggested messages:', error);
    }
  };

  useEffect(() => {
    fetchSuggestedMessages();
  }, []);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('/api/send-message', { message });
      if (response.data.success) {
        console.log('Message sent successfully:', message);
        setMessage(''); // Clear message input after sending
      } else {
        console.error('Failed to send message:', response.data.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="my-4 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className='text-4xl font-bold mb-4'>Public Profile Link</h1>
      <Card>
        <CardHeader>
          <CardTitle>Send Anonymous Message to @hc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
             
            </label>
            <Input 
              type="text"
              placeholder="Write your anonymous message here"
              value={message}
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
