import Image from "next/image"; //built-in component in Next.js that automatically optimizes your images.
import Link from "next/link";

export default function Home()
{
  return(
    <main>        <h1 className="text-3xl font-bold mb-6 text-center">Bug Tracker</h1>

    <Link href="/Auth/Login">
    Log In
    </Link>
    </main>
  
  )
}