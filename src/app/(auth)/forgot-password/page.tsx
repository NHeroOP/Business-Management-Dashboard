"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { ApiResponse } from "@/types/ApiResponse";

import axios from "axios";
import { api } from "@/lib/api";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner"
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

const ForgotPasswordFormSchema = z.object({
  email: z.email("Invalid email address")
})


export default function ForgotPassword() {
  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
  })
  
  const onSubmit = async (data: z.infer<typeof ForgotPasswordFormSchema>) => {

    try {
      await api.post<ApiResponse>("/auth/forgot-password", data)
      toast.success("If the email exists, a reset link has been sent to your inbox.", {
        position: "bottom-right"
      })

    } catch (err: unknown) {
      if (axios.isAxiosError<ApiResponse>(err)) {
        toast.error(err.response?.data.message, {
          position: "bottom-right"
        })
      }
    }
  }
    

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription> 
                Enter your email address and we'll send you instructions to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="forgot-password-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="email"
                    control={ form.control }
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          type="text"
                          required
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <FieldDescription>
                    We will send you an email with instructions to reset your password.
                  </FieldDescription>
                  <Field>
                    <Button form="forgot-password-form" type="submit">
                      Send Reset Link
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
