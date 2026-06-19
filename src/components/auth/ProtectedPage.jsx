'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { useAuthContext } from '@/utils/providers/AuthProvider';


export default function ProtectedPage({ children }) {

    const {
        data,
        isLoading
    } = useAuthContext();

    const router = useRouter();


    useEffect(() => {

        if (
            !isLoading &&
            !data?.data?.authenticated
        ) {
            router.replace('/signin');
        }

    }, [isLoading, data, router]);



    if (isLoading) {
        return (

            <div className='flex items-center justify-center h-[calc(100vh-150px)]'>

                <Loader2
                    className='h-10 w-10 animate-spin'
                />

            </div>

        );
    }



    if (!data?.data?.authenticated) {
        return null;
    }


    return children;
}