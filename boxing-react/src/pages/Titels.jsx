import Layout from "../components/Layout";

const weightClasses = [
  {
    name: "Heavyweight",
    belts: [
      { org: "IBF", holder: "Oleksandr Usyk" },
      { org: "WBA", holder: "Oleksandr Usyk" },
      { org: "WBC", holder: "Oleksandr Usyk" },
      { org: "WBO", holder: "Fabio Wardley" },
    ],
  },
  {
    name: "Cruiserweight",
    belts: [
      { org: "IBF", holder: "VACANT", vacant: true },
      { org: "WBA", holder: "Gilberto Ramirez" },
      { org: "WBC", holder: "Noel Mikaelyan" },
      { org: "WBO", holder: "Gilberto Ramirez" },
    ],
  },
];

const orgClass = {
  IBF: "ibf",
  WBA: "wba",
  WBC: "wbc",
  WBO: "wbo",
};

export default function Titels() {
  return (
    <Layout
      tag="Title Holders"
      title="Boxing Champions"
      subtitle="Bekijk per gewichtsklasse wie momenteel de kampioenen zijn bij de vier grote bonden."
    >
      <section className="champions-section">
        <div className="champions-header">
          <p className="champions-tag">Title Holders</p>
          <h2>Boxing Champions</h2>
          <p>
            Bekijk per gewichtsklasse wie momenteel de kampioenen zijn bij de
            vier grote bonden.
          </p>
        </div>

        <div className="champions-grid">
          {weightClasses.map((weight) => (
            <article key={weight.name} className="weight-card">
              <h3>{weight.name}</h3>
              <div className="belt-list">
                {weight.belts.map((belt) => (
                  <div key={belt.org} className="belt-row">
                    <span className={`belt ${orgClass[belt.org]}`}>
                      {belt.org}
                    </span>
                    <span
                      className={`champion-name${belt.vacant ? " vacant" : ""}`}
                    >
                      {belt.holder}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
