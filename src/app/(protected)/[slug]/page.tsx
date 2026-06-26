"use client";

import { useRouter } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: PageProps) {
  const router = useRouter();
  const { slug } = await params;

  return router.replace(`/${slug}/dashboard`)
}
