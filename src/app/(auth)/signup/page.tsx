"use client"

import * as z from "zod"
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"
import { signupSchema } from "@/schemas/signupSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "john_doe",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
  })
 
  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    try {
      setLoading(true);
      const res = (
        await api.post<ApiResponse>("/auth/register", data)
      ).data

      if (res.success) {
        toast("Account created successfully! Please log in.", {
          action: {
            label: "Log in",
            onClick: () => {
              router.push("/login");
            }
          } ,
          position: "bottom-right"
        })
      }

    } catch (err: unknown) {

      if (axios.isAxiosError<ApiResponse>(err)) {
        toast.error(err.response?.data.message || "An error occurred during registration.")
      }
    }
    finally {
      form.reset()
      setLoading(false);
    }
  }

  const changePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="flex relative min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Image
        src="/images/bg2.jpg"
        alt="Background"
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover h-full w-full"
      />

      <div className="w-full max-w-sm z-1 md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="p-6 md:p-8" id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="gap-5">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-sm text-balance text-muted-foreground">
                      Enter your information below to create your account
                    </p>
                  </div>

                  <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <Input
                          {...field}
                          id="username"
                          type="text"
                          placeholder="john_doe"
                          defaultValue="johndoe"
                          required
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                          {...field}
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          defaultValue="John Doe"
                          required
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          defaultValue="john.doe@example.com"
                          required
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="password123"
                            defaultValue="password123"
                            required
                          />
                          <button
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            type="button"
                            onClick={changePasswordVisibility}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Field>
                    <Button form="signup-form" type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          Creating account
                          <span className="loading loading-spinner loading-sm"></span>
                        </>
                      ) : "Create Account"}
                    </Button>
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or
                  </FieldSeparator>
                  <Field>
                    <Button variant="outline" type="button">
                      <Image src="/logos/google.svg" alt="Google" width={24} height={24} />
                      <span>Sign up with Google</span>
                    </Button>
                  </Field>
                  <FieldDescription className="text-center">
                    Already have an account? <a href="login">Log in</a>
                  </FieldDescription>
                </FieldGroup>
              </form>
              <div className="relative hidden bg-muted md:block">
                <img
                  src="/images/signup.jpg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </div>
  )
}

