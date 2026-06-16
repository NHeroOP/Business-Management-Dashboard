"use client";

import { Button } from "@/components/ui/button";
import { Plus, EllipsisVertical } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [businesses, getBusinesses] = useState([
    { id: 1, name: "Business 1", slug: "business-1" },
    { id: 2, name: "Business 2", slug: "business-2" },
    { id: 3, name: "Business 3", slug: "business-3" },
  ])

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <div className="navbar bg-muted shadow-sm px-64">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>

      <div className="">
        <div className="self-end px-64 py-4">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            Create New
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <ul className="list rounded-box shadow-md">
  
          {businesses.map((business) => (
            <li className="list-row" key={business.id}>
              <div><img className="size-10 rounded-box" src={`https://ui-avatars.com/api/?rounded=true&name=${business.name}`} /></div>
              <div>
                <div>{business.name}</div>
                <div className="text-xs uppercase font-semibold opacity-60">{business.slug}</div>
              </div>
              <button className="btn btn-square btn-ghost">
                <EllipsisVertical className="w-4 h-4" />
              </button>
            </li>
          ))}
          
        </ul>
      </div>

    </div>
  )
}
