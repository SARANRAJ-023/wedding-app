"use client";

import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useSearchParams, useRouter } from 'next/navigation';
import WeddingInvitation from '@/app/invitation/page';
import WeddingInfo from '@/app/wedding-info/page';
import WeddingTrailer from '@/app/trailer/page';
import LiveStreamComponent from '@/app/live/page';
import GalleryPage from '@/app/gallery/page';
import GiftPage from '@/app/gift/page';

const SLIDES_MAP = {
    'invitation': 0,
    'info': 1,
    'trailer': 2,
    'live': 3,
    'gallery': 4,
    'gift': 5
};

const REV_SLIDES_MAP = [
    'invitation',
    'info',
    'trailer',
    'live',
    'gallery',
    'gift'
];

export default function MainCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const searchParams = useSearchParams();
    const router = useRouter();

    // Handle initial navigation based on URL param
    // Handle initial navigation based on URL param
    useEffect(() => {
        if (emblaApi) {
            const section = searchParams.get('s');
            if (section && SLIDES_MAP[section as keyof typeof SLIDES_MAP] !== undefined) {
                const targetIndex = SLIDES_MAP[section as keyof typeof SLIDES_MAP];
                if (emblaApi.selectedScrollSnap() !== targetIndex) {
                    emblaApi.scrollTo(targetIndex, true); // true = jump immediately
                }
            }
        }
    }, [emblaApi, searchParams]);

    // Sync URL on swipe
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            const index = emblaApi.selectedScrollSnap();
            const section = REV_SLIDES_MAP[index];
            // Shallow update of URL without full reload
            const newUrl = `/view?s=${section}`;
            router.replace(newUrl, { scroll: false });
        };

        emblaApi.on('select', onSelect);

        // Clean up
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, router]);

    return (
        <div className="embla w-full h-screen overflow-hidden bg-black touch-pan-y" ref={emblaRef}>
            <div className="embla__container flex w-full h-full">

                {/* Slide 1: Invitation */}
                <div className="embla__slide flex-[0_0_100%] min-w-0 w-full h-full">
                    <WeddingInvitation />
                </div>

                {/* Slide 2: Wedding Info */}
                <div className="embla__slide flex-[0_0_100%] min-w-0 w-full h-full">
                    <WeddingInfo />
                </div>

                {/* Slide 3: Trailer */}
                <div className="embla__slide flex-[0_0_100%] min-w-0 w-full h-full">
                    <WeddingTrailer />
                </div>

                {/* Slide 4: Live */}
                <div className="embla__slide flex-[0_0_100%] min-w-0 w-full h-full">
                    <LiveStreamComponent />
                </div>

                {/* Slide 5: Gallery */}
                <div className="embla__slide flex-[0_0_100%] min-w-0 w-full h-full overflow-y-auto">
                    <GalleryPage />
                </div>

                {/* Slide 6: Gift */}
                <div className="embla__slide flex-[0_0_100%] min-w-0 w-full h-full">
                    <GiftPage />
                </div>
            </div>
        </div>
    );
}
