import { useState } from "react";
import Layout from "../components/Layout";
import RecentFightBlock from "../components/RecentFightBlock";
import {
  fetchMostRecentFight,
  mapFighterCard,
  normalizeArray,
  normalizeText,
  searchFightersByName,
} from "../utils/boxingApi";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fighters, setFighters] = useState([]);
  const [fightersMessage, setFightersMessage] = useState(null);
  const [recentFight, setRecentFight] = useState(null);
  const [fightStatus, setFightStatus] = useState(
    "Zoek hierboven naar een bokser om het meest recente gevecht te tonen.",
  );
  const [primaryFighterName, setPrimaryFighterName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    const term = searchTerm.trim();
    if (!term) {
      setFighters([]);
      setFightersMessage("Typ eerst een naam van een vechter in.");
      setRecentFight(null);
      setFightStatus("Zoek een vechter om het meest recente gevecht te laden.");
      return;
    }

    setLoading(true);
    setFightersMessage("Bezig met zoeken...");
    setFightStatus("Bezig met meest recente gevecht ophalen...");

    try {
      const response = await searchFightersByName(term);

      if (!response.ok) {
        setFighters([]);
        setFightersMessage(
          `API fout ${response.status}: ${
            response.data?.message ||
            response.data?.error?.message ||
            "Onbekende fout"
          }`,
        );
        setRecentFight(null);
        setFightStatus("Kon gevechten niet laden.");
        return;
      }

      const list = normalizeArray(response.data);
      if (!list.length) {
        setFighters([]);
        setFightersMessage("Geen vechters gevonden.");
        setRecentFight(null);
        setFightStatus("Geen vechter gevonden.");
        return;
      }

      setFighters(list.map(mapFighterCard));
      setFightersMessage(null);

      const normalizedSearch = normalizeText(term);
      const primaryFighter =
        list.find((f) => normalizeText(f?.name) === normalizedSearch) ||
        list.find((f) => normalizeText(f?.name).includes(normalizedSearch)) ||
        list[0];

      const name = primaryFighter?.name || term;
      setPrimaryFighterName(name);

      const recent = await fetchMostRecentFight(primaryFighter, term);
      if (!recent) {
        setRecentFight(null);
        setFightStatus(`Geen recent gevecht gevonden voor ${name}.`);
        return;
      }

      setRecentFight(recent);
      setFightStatus(null);
    } catch (error) {
      console.error("Fetch fout:", error);
      setFighters([]);
      setFightersMessage("Er ging iets mis bij het ophalen van de data.");
      setRecentFight(null);
      setFightStatus("Er ging iets mis met het laden van gevechten.");
    } finally {
      setLoading(false);
    }
  }

  const searchBar = (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Zoek bijvoorbeeld op Tyson Fury..."
        disabled={loading}
      />
      <button type="button" onClick={handleSearch} disabled={loading}>
        {loading ? "Zoeken..." : "Zoeken"}
      </button>
    </div>
  );

  return (
    <Layout
      tag="Boxing Database"
      title="Zoek jouw favoriete bokser"
      subtitle="Zoek eenvoudig naar professionele vechters en bekijk hun nationaliteit, gewichtsklasse en record."
      heroExtra={searchBar}
    >
      <section className="info-panel">
        <h2>Live fighter search</h2>
        <p>Gebruik de zoekbalk hierboven om vechters op te halen uit de API.</p>
      </section>

      <section className="upcoming-section">
        <RecentFightBlock
          fight={recentFight}
          fighterName={primaryFighterName}
          statusMessage={fightStatus}
        />
      </section>

      <section className="results-section">
        <div className="section-head">
          <h2>Resultaten</h2>
        </div>
        <div className="fighters-grid">
          {fightersMessage ? <p>{fightersMessage}</p> : null}
          {fighters.map(({ name, nationality, division, record, image }) => (
            <article key={name} className="fighter-card">
              <img src={image} alt={name} className="fighter-image" />
              <h3>{name}</h3>
              <p>
                <strong>Nationaliteit:</strong> {nationality}
              </p>
              <p>
                <strong>Gewichtsklasse:</strong> {division}
              </p>
              <p>
                <strong>Record:</strong> {record}
              </p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
