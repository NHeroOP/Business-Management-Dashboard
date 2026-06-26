"use client";

import { useEffect } from "react";

import { api } from "@/lib/api";
import { isAxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

import { Business } from "@/types/model";
import { useParams } from "next/navigation";
import { useBusinessStore } from "@/store/business";

import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isHydrated, businesses, setBusinesses, currBusiness, setCurrBusiness } = useBusinessStore();
  const { slug } = useParams();

  useEffect(() => {
    const fetchUserBusinesses = async () => {
      try {
        const res = (await api.get<ApiResponse>("/businesses")).data;
        setBusinesses(res.data as Business[]);
        console.log(res)
      } catch (err) {
        if (isAxiosError<ApiResponse>(err)) {
          console.log(err.response?.data.message);
        }
      }
    };

    if (businesses.length === 0) {
      fetchUserBusinesses();
    }

    if (businesses.length > 0) {
      const business = businesses.find((b) => b.slug === slug);
      if (business) {
        setCurrBusiness(business);
      }
    }
  }, [businesses, currBusiness]);

  if (!isHydrated) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
          { children }
      </SidebarInset>
    </SidebarProvider>
  )
  
}
