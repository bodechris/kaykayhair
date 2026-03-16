import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="flex flex-col items-center gap-4">
            <Image src="/vertical-logo.svg" alt="KayKay Hair Logo" width={400} height={400} />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8">Welcome to KayKay Hair</h1>
            <p className="text-md text-gray-600 dark:text-gray-400">Your one-stop shop for all your hair care needs.</p>
        </div>
    </div>
  );
}
