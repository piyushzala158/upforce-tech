import Loader from "@/components/Loader/Loader";
import Home from "@/views/home";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  );
}
