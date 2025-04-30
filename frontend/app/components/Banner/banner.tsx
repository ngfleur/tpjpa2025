import Image from 'next/image';

export const Banner = () => {
    return (
        <div className="relative">
            <div className="flex sm:flex-row flex-col bg-zinc-900">
                <div className="basis-1/2 text-center sm:text-left relative">
                    <div className="px-10 sm:px-14 py-6 bg-site" data-testid="home.header">
                        <h1 className="text-5xl sm:text-[120px] leading-none animate-fade-in">
                            VOS
                            <br />
                            BILLETS
                            <br />
                            ICI
                        </h1>
                        <h3 className="text-base sm:text-2xl py-6">
                            EN QUELQUES CLICS SUR
                            <span className="text-purple-500"> EV$NT</span>
                        </h3>
                    </div>
                    <div className="bg-zinc-900 h-[75px] w-full"></div>
                </div>
                <div className="basis-1/2">
                    <Image
                        alt="EV$NT"
                        src="/images/accueil1.jpeg"
                        width={1000}
                        height={800}
                        className="w-full px-10 sm:px-0"
                    />
                </div>
            </div>
            <Image
                alt="EV$NT"
                src="/images/accueil-2.jpeg"
                width={202}
                height={245}
                className="absolute inset-x-2/4 -translate-x-2/4 -translate-y-[20%] bottom-0 top-[20%] hidden sm:block"
            />
        </div>
    );
};