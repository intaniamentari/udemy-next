'use client'

import { Button } from "@/components/ui/button";

export default function Homepage() {
  return (
    <div className="flex flex-col gap-5">
      {/* Hrader */}
      <div className="flex justify-between items-center bg-gray-200 p-5 px-20">
        <h1 className="font-bold! text-2xl text-black">B.E.A.U.T.Y</h1>
        <Button>Login</Button>
      </div>

      {/* hero section */}
      <div className="bg-white mt-20 lg:grid-cols-2 grid-cols-1 px-20 min-h-[70vh] items-center grid gap-10">
        {/* content */}
        <div className="col-span-1">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold!">Welcome to B.E.A.U.T.Y Salon and Spa</h1>
            <p className="text-sm text-gray-600">B.E.A.U.T.Y Salon and Spa is a modern and luxurious spa experience. Helps you relax and rejuvenate. Have a experience of a lifetime. Enjoy your time with us.</p>
            <Button className="w-max">Find a Salon</Button>
          </div>
        </div>
        {/* image */}
        <div className="col-span-1 flex justify-center">
          <img className="w-full" src="images/salon.jpg" alt="salon" />
        </div>
      </div>
    </div>
  );
}
