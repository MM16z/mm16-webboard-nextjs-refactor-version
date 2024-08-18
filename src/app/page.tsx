import { homepageApiService } from "../api/homepageService";
import MasonryComponent from "../components/masonry/Masonry";
import { silkscreen } from "./fonts";

export default async function Home() {
  // const data = await useAllPosts();
  const data = await homepageApiService.getAllPosts({ offset: 0 });
  console.log("data", data);
  return (
    <main className={`${silkscreen.className}`}>
      <h2 className="text-center pt-4">Register with any non-existing email to post, comment, or like.</h2>
      {/* Masonry component */}
      <div className="masonry-warper">
        <MasonryComponent />
      </div>
    </main>
  );
}
