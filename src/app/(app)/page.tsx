"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";
import messages from "@/data/messages.json";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Autoplay from "embla-carousel-autoplay";
import { Mail } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  // const form = useForm({
  //   resolver: zodResolver(signInSchema),
  //   defaultValues: {
  //     identifier: "",
  //     password: "",
  //   },
  // });

  // const onSubmit = async (data: z.infer<typeof signInSchema>) => {
  //   const result = await signIn("credentials", {
  //     redirect: false,
  //     identifier: data.identifier,
  //     password: data.password,
  //   });
  //   if (result?.error) {
  //     if (result.error === "CredentialsSignin") {
  //       toast({
  //         title: "Login Failed",
  //         description: "Incorrect username or password",
  //         variant: "destructive",
  //       });
  //     } else {
  //       toast({
  //         title: "Error",
  //         description: result.error,
  //         variant: "destructive",
  //       });
  //     }
  //   }
  //   if (result?.url) {
  //     router.replace("/dashboard");
  //   }
  // };

  return (
    <>
      <header
        className="bg-gray-900 text-white relative bg-cover bg-center h-80 flex items-center justify-center"
        style={{ backgroundImage: "url(/path-to-your-hero-image.jpg)" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-6xl font-bold leading-tight mb-6">
            Welcome to <span className="text-blue-400">Incog :)</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Your go-to platform for{" "}
            <span className="text-blue-400">anonymous messaging</span> with a
            focus on <span className="text-blue-400">privacy</span> and
            security.
          </p>
          <a
            href="#features"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold"
          >
            Learn More
          </a>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 pb-4 bg-black text-white">
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="ml-2 mb-0 p-0">
                      {message.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex md:flex-row items-center gap-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p className="text-xl">{message.content}</p>
                      <p className="text-md text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      <div className="bg-gray-900 text-white">
        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Incog?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Complete Anonymity
                </h3>
                <p className="text-gray-300">
                  Enjoy conversations without revealing your identity. Your
                  privacy is our top priority.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Secure Messaging</h3>
                <p className="text-gray-300">
                  Our platform ensures your messages are encrypted and protected
                  from unauthorized access.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  User-Friendly Interface
                </h3>
                <p className="text-gray-300">
                  Easily navigate and manage your conversations with our
                  intuitive and sleek design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 py-4">
          <div className="container mx-auto text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Incog. All rights reserved.
            </p>
            <div className="mt-2">
              <a href="#" className="text-blue-400 hover:underline mx-2">
                Privacy Policy
              </a>
              <a href="#" className="text-blue-400 hover:underline mx-2">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Page;
