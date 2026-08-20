import { ConnectionDesk } from "@/components/ConnectionDesk";
import { Footer } from "@/components/Footer";
import { Greeting } from "@/components/Greeting";
import { HomeStory } from "@/components/HomeStory";

export default function Home() {
  return <>
    <Greeting />
    <main id="main">
      <HomeStory />
      <section className="section"><div className="shell"><ConnectionDesk /></div></section>
    </main>
    <Footer />
  </>;
}
