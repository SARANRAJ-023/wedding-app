"use client";

import MainCarousel from "@/components/MainCarousel";
import { Suspense } from "react";

export default function ViewPage() {
    return (
        <Suspense fallback={<div className="h-screen w-full bg-white flex items-center justify-center">Loading...</div>}>
            <MainCarousel />
        </Suspense>
    );
}
