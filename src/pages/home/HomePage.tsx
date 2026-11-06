import { About } from './About';
import { Categories } from './Categories';
import { Collection } from './Collection';
import { Hero } from './Hero';
import { Looks } from './Looks';
import { MadeToOrder } from './MadeToOrder';
import { Marquee } from './Marquee';
import { Social } from './Social';

export function HomePage() {
  return (
    <>
      <title>Loyalty Path — чоловічий одяг, пошитий під замовлення</title>
      <meta
        name="description"
        content="Полузамки, джемпери, поло й брюки Loyalty Path. Шиємо під замовлення за 2–4 робочі дні, доставка Новою поштою."
      />
      <Hero />
      <Marquee />
      <Categories />
      <Collection />
      <Looks />
      <MadeToOrder />
      <About />
      <Social />
    </>
  );
}
