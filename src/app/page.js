//react
import { Suspense } from "react";

//component
import Loader from "@/components/Loader/Loader";
import Home from "@/views/home";

export default function HomePage() {
  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  );
}
