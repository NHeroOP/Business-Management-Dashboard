"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import { isAxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Business } from "@/types/model";
import { useBusinessStore } from "@/store/business";

import { Skeleton } from "@/components/ui/skeleton";
import { CreateBusinessForm } from "./_components/BusinessForm";
import { BusinessCard } from "./_components/BusinessCard";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); 
  const { setBusinesses, businesses } = useBusinessStore();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        const res = (await api.get<ApiResponse>("/businesses")).data;
        setBusinesses(res.data as Business[]);
        console.log(res)
      } catch (err) {
        if (isAxiosError<ApiResponse>(err)) {
          console.log(err.response?.data.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [refreshKey]);

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <div className="navbar bg-muted shadow-sm px-64">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Business Dashboard</a>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="self-end px-64 py-4">
        <CreateBusinessForm setRefreshKey={setRefreshKey} />
      </div>

      <div className="w-full px-48 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {
          loading ? (
            <>
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </>
          ) : (businesses.length > 0 && businesses.map((business) => (
            <BusinessCard key={business._id} business={business} />
          )))
        }
      </div>
    </div>
  );
}

