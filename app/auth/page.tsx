// File: /app/auth/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GoogleIcon } from "@/components/icons";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
type LoginFormData = z.infer<typeof loginSchema>;

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    fullName: z.string().min(1, { message: "Full name is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const { login, register: registerUser, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const tab = searchParams.get("tab");

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmitHook,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    reset: resetLoginForm,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmitHook,
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
    reset: resetRegisterForm,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success("Login successful!");
      resetLoginForm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login will be implemented soon");
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.password, data.fullName);
      toast.success("Registration successful! Please log in.");
      resetRegisterForm();

      setTimeout(() => {
        const params = new URLSearchParams();
        params.set('tab', 'login');
        if (redirect) {
          params.set('redirect', redirect);
        }
        router.push(`/auth?${params.toString()}`);
      }, 5000);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    }
  };

  const handleGoogleRegister = () => {
    toast.info("Google registration will be implemented soon");
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push(typeof redirect === "string" ? redirect : "/");
    }
  }, [isAuthenticated, redirect, router]);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md shadow-lg">
        <Tabs onValueChange={setActiveTab} value={activeTab} className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Welcome to Naturia
            </CardTitle>
            <CardDescription>
              Log in or create an account to continue
            </CardDescription>
            <TabsList className="grid w-full grid-cols-2 mt-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
          </CardHeader>

          {/* Login */}
          <TabsContent value="login">
            <CardContent>
              <form onSubmit={handleLoginSubmitHook(onLoginSubmit)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="name@example.com"
                      {...registerLogin("email")}
                      disabled={isLoginSubmitting}
                      aria-invalid={loginErrors.email ? "true" : "false"}
                    />
                    {loginErrors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {loginErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showLoginPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...registerLogin("password")}
                        disabled={isLoginSubmitting}
                        aria-invalid={loginErrors.password ? "true" : "false"}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 px-0"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        aria-label={
                          showLoginPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showLoginPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {loginErrors.password && (
                      <p className="text-sm text-red-600 mt-1">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoginSubmitting}
                    className="w-full"
                  >
                    {isLoginSubmitting ? "Logging in..." : "Log in"}
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    disabled={isLoginSubmitting}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <GoogleIcon />
                    Continue with Google
                  </Button>
                </div>
              </form>
            </CardContent>
          </TabsContent>

          {/* Register */}
          <TabsContent value="register">
            <CardContent>
              <form onSubmit={handleRegisterSubmitHook(onRegisterSubmit)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="name@example.com"
                      {...registerRegister("email")}
                      disabled={isRegisterSubmitting}
                      aria-invalid={registerErrors.email ? "true" : "false"}
                    />
                    {registerErrors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {registerErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="register-fullName">Full Name</Label>
                    <Input
                      id="register-fullName"
                      type="text"
                      placeholder="John Doe"
                      {...registerRegister("fullName")}
                      disabled={isRegisterSubmitting}
                      aria-invalid={registerErrors.fullName ? "true" : "false"}
                    />

                    {registerErrors.fullName && (
                      <p className="text-sm text-red-600 mt-1">
                        {registerErrors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showRegisterPassword ? "text" : "password"}
                        placeholder="•••••••• (min. 6 characters)"
                        {...registerRegister("password")}
                        disabled={isRegisterSubmitting}
                        aria-invalid={
                          registerErrors.password ? "true" : "false"
                        }
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 px-0"
                        onClick={() =>
                          setShowRegisterPassword(!showRegisterPassword)
                        }
                        aria-label={
                          showRegisterPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showRegisterPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {registerErrors.password && (
                      <p className="text-sm text-red-600 mt-1">
                        {registerErrors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="register-confirmPassword">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="register-confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...registerRegister("confirmPassword")}
                        disabled={isRegisterSubmitting}
                        aria-invalid={
                          registerErrors.confirmPassword ? "true" : "false"
                        }
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 px-0"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {registerErrors.confirmPassword && (
                      <p className="text-sm text-red-600 mt-1">
                        {registerErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isRegisterSubmitting}
                    className="w-full"
                  >
                    {isRegisterSubmitting ? "Creating account..." : "Sign up"}
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        or signup with
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleRegister}
                    disabled={isRegisterSubmitting}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <GoogleIcon />
                    Sign up with Google
                  </Button>
                </div>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
