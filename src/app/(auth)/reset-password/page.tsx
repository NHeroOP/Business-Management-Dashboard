"use client";

import { useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { ApiResponse } from "@/types/ApiResponse";

import axios from "axios";
import { api } from "@/lib/api";

import { Controller, useForm } from "react-hook-form";

import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation";

const ResetPasswordFormSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
})

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const [ showPassword, setShowPassword ] = useState(false)

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
  })
  
  const onSubmit = async (data: z.infer<typeof ResetPasswordFormSchema>) => {
    try {
      const res = (
        await api.post<ApiResponse>("/auth/reset-password", {
          token: searchParams.get("token"),
          userId: searchParams.get("userId"),
          newPassword: data.newPassword,
        })
      ).data

      console.log("Response", res)

    } catch (err: unknown) {

      if (axios.isAxiosError<ApiResponse>(err)) {
        console.log("Error /auth/reset-password:", err.response?.data.message);
      }
    }
  }
    

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription> 
                Enter your new password and confirm it to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="newPassword"
                    control={ form.control }
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            id="newPassword"
                            type={showPassword ? "text" : "password"}
                            required
                          />
                          <button
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword((prev) => !prev)}
                            type="button"
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
                  <FieldDescription>
                    Your new password must be at least 8 characters long.
                  </FieldDescription>
                  <Field>
                    <Button form="reset-password-form" type="submit">
                      Reset Password
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
