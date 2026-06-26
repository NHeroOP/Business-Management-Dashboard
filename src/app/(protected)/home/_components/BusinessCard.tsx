
import { useState } from "react";
import Link from "next/link";

import { Business } from "@/types/model";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Building2, MoreHorizontal } from "lucide-react";


export function BusinessCard({ business }: { business: Business }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Link href={`/${business.slug}/dashboard`}>
      <Card className="group cursor-pointer border-border/50 bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40 hover:bg-accent/20">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                {business.logo ? (
                  <img
                    src={business.logo.url}
                    alt={business.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                )}
              </div>

              <div>
                <h3 className="font-semibold text-base">{business.name}</h3>

                <p className="text-sm text-muted-foreground">{business.slug}</p>

                <div className="mt-2 inline-flex rounded-full border px-2 py-1 text-xs text-muted-foreground">
                  {business.role}
                </div>
              </div>
            </div>

            <DropdownMenu
              onOpenChange={() => setIsMenuOpen((prev) => !prev)}
              open={isMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <button
                  className={`rounded-md p-2 ${!isMenuOpen && "opacity-0"} transition-opacity hover:bg-muted group-hover:opacity-100`}
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>Open</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
