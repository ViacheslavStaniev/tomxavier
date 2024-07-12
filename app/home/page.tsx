import Button from '@/components/ui/Button';
import HomeCard from '@/components/ui/HomeCard';

export default async function Home() {
  return (
    <div className="flex flex-row justify-center min-h-[calc(100dvh-3rem)] md:min-h[calc(100dvh-4rem)]">
      {/* <HomeSideBar /> */}
      <HomeCard />
    </div >
  );
}
