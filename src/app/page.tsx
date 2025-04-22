import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Homepage() {
  return (
    <div className="flex flex-col gap-5">
      <h1>Homepage</h1>
      <Button className="w-max">Salon and Spa</Button>
      <Input placeholder="Enter your name" className="w-max" />
    </div>
  );
}
