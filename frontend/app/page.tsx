import { HomeScreen } from '@app/components/HomeScreen/HomeScreen';
import { evenementsDemo } from '@app/data/evenementsDemo';
import {Banner} from "@components/Banner/banner";

//export default async function Home() {
  // Données de démonstration

  const evenements = [];

  export default async function Home() {
    const evenements = evenementsDemo;
  return (
    <main className="min-h-screen bg-zinc-900">
      <Banner />
      <HomeScreen evenements={evenements} />
    </main>
  );
}