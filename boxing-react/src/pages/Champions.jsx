import Layout from "../components/Layout";
import { assetUrl } from "../utils/assetUrl";

const divisions = [
  {
    title: "Heavyweight",
    weight: "Gewichtsklasse: +90,7 kg",
    name: "Oleksandr Usyk",
    image: assetUrl("/images/usyk.jpg"),
    meta: "Unified Heavyweight Champion - Oekraïne",
    since: "Champion sinds: 18-05-2024",
  },
  {
    title: "Cruiserweight",
    weight: "Gewichtsklasse: tot 90,7 kg",
    name: "Jai Opetaia",
    image: assetUrl("/images/opetaia.jpg"),
    meta: "Top cruiserweight champion - Australië",
    since: "Champion sinds: 07-01-2024",
  },
  {
    title: "Middleweight",
    weight: "Gewichtsklasse: tot 72,6 kg",
    name: "Janibek Alimkhanuly",
    image: assetUrl("/images/Alimkhanuly.jpg"),
    meta: "Wereldkampioen middleweight - Kazachstan",
    since: "Champion sinds: 14-10-2023",
  },
  {
    title: "Welterweight",
    weight: "Gewichtsklasse: tot 66,7 kg",
    name: "Terence Crawford",
    image: assetUrl("/images/crawford.jpg"),
    meta: "Elite kampioen welterweight - Verenigde Staten",
    since: "Champion sinds: 29-07-2023",
  },
  {
    title: "Lightweight",
    weight: "Gewichtsklasse: tot 61,2 kg",
    name: "Gervonta Davis",
    image: assetUrl("/images/davis.jpg"),
    meta: "Dominante lightweight kampioen - Verenigde Staten",
    since: "Champion sinds: 15-06-2024",
  },
];

export default function Champions() {
  return (
    <Layout
      tag="Champions"
      title="Top kampioenen"
      subtitle="Overzicht van actieve kampioenen in de belangrijkste gewichtsklassen."
    >
      <section
        className="champions-overview"
        aria-label="Champions per gewichtsklasse"
      >
        {divisions.map((division) => (
          <article key={division.title} className="division-wrap">
            <h2 className="division-title">{division.title}</h2>
            <p className="division-weight">{division.weight}</p>
            <div className="division-champion-box">
              <img
                src={division.image}
                alt={division.name}
                className="division-champion-photo"
              />
              <h3 className="division-champion-name">{division.name}</h3>
              <p className="division-champion-meta">{division.meta}</p>
              <p className="division-champion-date">{division.since}</p>
            </div>
          </article>
        ))}
      </section>
    </Layout>
  );
}
