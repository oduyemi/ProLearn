import { Banner } from "@/components/home/Banner";
import { ContentFiller } from "@/components/contentFiller";
import { CoursePreview } from "@/components/home/CoursePreview";
import { Features } from "@/components/home/Features";



export default function Home() {
  return (
    <div>
      <Banner />
      <div>
        <CoursePreview />
      </div>
      <div className="mt-2">
      <Features />
      </div>
      <div>
        <ContentFiller />
      </div>
    </div>
  );
}