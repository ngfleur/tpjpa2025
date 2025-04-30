'use client';

import {HomeScreen} from '@app/components/HomeScreen/HomeScreen';
import {Banner} from "@components/Banner/banner";

export default async function Home() {
    return (
        <main className="min-h-screen bg-zinc-900">
            <Banner/>
            <HomeScreen/>
        </main>
    );
}