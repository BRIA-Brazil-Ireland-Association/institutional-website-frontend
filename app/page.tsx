import Hero from '@/components/sections/Hero';
import InformationHub from '@/components/sections/InformationHub';
import About from '@/components/sections/About';
import Team from '@/components/sections/Team';
import Events from '@/components/sections/Events';

export default function HomePage() {
	return (
		<main>
			<Hero />
			<InformationHub />
			<About />
			<Team />
			<Events />
		</main>
	);
}
