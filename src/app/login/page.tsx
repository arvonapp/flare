"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  VStack,
  useToast,
  ChakraProvider,
  extendTheme,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

declare global {
  interface Window {
    turnstile: any;
  }
}

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      setError('Please complete the CAPTCHA');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3005/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, token }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Login successful!');
        setError(null);
        toast({
          title: 'Login Successful',
          description: data.message || 'Welcome back!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        console.log(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed!');
        setSuccess('');
        toast({
          title: 'Login Failed',
          description: errorData.message || 'Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess('');
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTurnstileSuccess = (captchaToken: string) => {
    setToken(captchaToken);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={4}
        position="relative"
        overflow="hidden"
        backgroundImage="url('https://cdn.discordapp.com/attachments/1270795088607445033/1318620358093574275/NyternSignin14x.png?ex=6762fc68&is=6761aae8&hm=ca0b1eeddc2256f0fc1184fcc7fe3a041464381a53c789116557a9286c8d48e1&')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box
          maxWidth="400px"
          w="full"
          bg="rgba(0, 0, 0, 0.7)"
          p={6}
          boxShadow="lg"
          borderRadius="md"
          zIndex="1"
          backdropFilter="blur(8px)"
        >
          <VStack spacing={4} align="stretch">
            <Text fontSize="4xl" fontWeight="bold" textAlign="center" color="white">
              Sign into Arvon
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <Input
                  id="email"
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="#000000"
                  color="white"
                />
              </FormControl>
              <FormControl isRequired mt={4}>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg="#000000"
                  color="white"
                />
              </FormControl>

              <Box
              className="cf-turnstile"
              data-sitekey="0x4AAAAAAA29gzBeeVpIOCwD"
              mt={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            />
            
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                mt={4}
                isLoading={loading}
                loadingText="Logging in..."
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            {error && <Text color="blue.500" mt={4}>{error}</Text>}
            {success && <Text color="green.500" mt={4}>{success}</Text>}

            <Text textAlign="center" mt={2} color="white">
              Don't have an account?{' '}
              <NextLink href="/register" passHref>
                <Link color="blue.500">Register</Link>
              </NextLink>
            </Text>

            <Text textAlign="center" mt={2} color="white">
              <NextLink href="/forgot-password" passHref>
                <Link color="blue.500">Forgot Password?</Link>
              </NextLink>
            </Text>
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default LoginPage;
