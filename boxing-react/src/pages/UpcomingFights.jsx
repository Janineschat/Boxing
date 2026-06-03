import Layout from "../components/Layout";

const upcomingRows = [
  ["Heavyweight", "+90,7 kg", "Oleksandr Usyk vs. Tyson Fury", "21-09-2026", "World Title Night"],
  ["Cruiserweight", "tot 90,7 kg", "Jai Opetaia vs. Mairis Briedis", "05-10-2026", "Global Boxing Series"],
  ["Middleweight", "tot 72,6 kg", "Janibek Alimkhanuly vs. Carlos Adames", "19-10-2026", "Championship Clash"],
  ["Welterweight", "tot 66,7 kg", "Terence Crawford vs. Jaron Ennis", "02-11-2026", "Elite Fight Card"],
  ["Lightweight", "tot 61,2 kg", "Gervonta Davis vs. Shakur Stevenson", "16-11-2026", "Fight Night Prime"],
];

const pastRows = [
  ["Heavyweight", "+90,7 kg", "Oleksandr Usyk vs. Tyson Fury", "18-05-2024", "Undisputed Championship", "Usyk won (Split Decision)"],
  ["Cruiserweight", "tot 90,7 kg", "Jai Opetaia vs. Mairis Briedis", "17-02-2024", "Cruiserweight Finals", "Opetaia won (Unanimous Decision)"],
  ["Middleweight", "tot 72,6 kg", "Janibek Alimkhanuly vs. Vincenzo Gualtieri", "14-10-2023", "Middleweight Title Unification", "Alimkhanuly won (TKO R6)"],
  ["Welterweight", "tot 66,7 kg", "Terence Crawford vs. Israil Madrimov", "03-08-2024", "Summer Showdown", "Crawford won (UD)"],
  ["Lightweight", "tot 61,2 kg", "Gervonta Davis vs. Frank Martin", "15-06-2024", "Las Vegas Fight Night", "Davis won (KO R8)"],
];

function FightTable({ headers, rows }) {
  return (
    <div className="upcoming-table-wrap">
      <table className="upcoming-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function UpcomingFights() {
  return (
    <Layout
      tag="Upcoming Fights"
      title="Aankomende gevechten"
      subtitle="Hier kun je alle upcoming fights tonen in de stijl van je homepage."
    >
      <section
        className="upcoming-table-section"
        aria-label="Upcoming fights per divisie"
      >
        <div className="info-panel">
          <h2>Upcoming fights per gewichtsklasse</h2>
          <p>
            Overzicht van verwachte gevechten in de komende periode, gesorteerd
            op divisie.
          </p>
        </div>

        <FightTable
          headers={["Divisie", "Gewichtsklasse", "Aankomend gevecht", "Datum", "Event"]}
          rows={upcomingRows}
        />
      </section>

      <section
        className="upcoming-table-section"
        aria-label="Resultaten afgelopen jaar"
      >
        <div className="info-panel">
          <h2>Titel gevechten van de afgelopen jaren</h2>
        </div>

        <FightTable
          headers={["Divisie", "Gewichtsklasse", "Gevecht", "Datum", "Event", "Uitslag"]}
          rows={pastRows}
        />
      </section>
    </Layout>
  );
}
