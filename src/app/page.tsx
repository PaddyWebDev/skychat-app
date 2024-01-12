// import Image from 'next/image'
// import Link from 'next/link'

// export default function Home() {
//   return (
//     // <main className="flex min-h-screen flex-col items-center justify-between p-24">
//     //   <h1>Hello Joe mama</h1>
//     //   <Link href="/Login">To Login</Link>
//     // </main>
//     <div className="bg-white dark:bg-gray-800">
//       <div className="flex items-center justify-center h-screen">
//         <div className="max-w-md mx-auto p-8 rounded-lg shadow-lg bg-blue-500 dark:bg-blue-900 text-white">
//           <div className="text-4xl font-bold mb-4">Easy Chat with Friends</div>
//           <img src="phone-image.png" alt="Phone Image" className="mb-4" />
//           <p className="text-lg mb-4">Stay connected with your friends and family with our easy-to-use chat app.</p>
//           <a href="#" className="bg-white dark:bg-gray-600 text-blue-500 dark:text-blue-300 px-6 py-3 rounded-full inline-block">Download Now</a>
//         </div>
//       </div>
//     </div>

//   )
// }

"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="dark h-screen p-8 flex flex-col">

      <nav className="flex justify-between items-center">
        <h1 className="font-bold text-3xl dark:text-white">SkyChat</h1>

      </nav>

      <div className="mt-[6vh]  flex-grow flex items-center justify-center lg:flex-nowrap flex-wrap gap-3 ">

        <div>
          <h1 className="sm:text-6xl text-4xl font-bold mt-12 dark:text-white">
            Simple, Secure
            <br />
            Messaging
          </h1>

          <p className="mt-8 text-2xl text-gray-500 dark:text-gray-400">
            Connect with your friends...
          </p>

          <div className="flex md:flex-row flex-col gap-3 md:items-center items-start  ">
            <button onClick={() => router.push('/Register')} className="inline-flex text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-8 py-4 text-center dark:focus:ring-sky-900 my-4">Get Started</button>
            <button type="button" onClick={() => router.push('/Login')} className="py-4 px-8 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Already have account</button>
          </div>


        </div>

        <Image
          width={520}
          height={520}
          draggable='false'
          onContextMenu={(event) => event.preventDefault()}
          className=" md:w-2/5 rounded-full "
          src="/Images/Chat.svg"
          alt="Chat"
        />

      </div>

    </div>
  );
}