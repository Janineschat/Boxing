import { parseFightDisplay } from "../utils/boxingApi";

function StatusBlock({ message }) {
  return (
    <article className="fight-block">
      <div className="fight-head">
        <div className="fight-logo">BOX</div>
        <div className="fight-meta">
          <div className="fight-title">Meest recente gevecht</div>
          <div className="fight-location">{message}</div>
        </div>
      </div>
    </article>
  );
}

export default function RecentFightBlock({ fight, fighterName, statusMessage }) {
  if (statusMessage) {
    return <StatusBlock message={statusMessage} />;
  }

  if (!fight) {
    return (
      <StatusBlock message="Zoek hierboven naar een bokser om het meest recente gevecht te tonen." />
    );
  }

  const { eventName, location, date, leftName, rightName, cardType } =
    parseFightDisplay(fight, fighterName);

  return (
    <article className="fight-block">
      <div className="fight-head">
        <div className="fight-logo">BOX</div>
        <div className="fight-meta">
          <div className="fight-title">{eventName}</div>
          <div className="fight-location">{location}</div>
        </div>
      </div>
      <div className="fight-body">
        <div className="fight-topline">
          <span>{date}</span>
          <span className="fight-type">{cardType}</span>
          <span className="fight-star">☆</span>
        </div>
        <div className="fight-row">
          <h3 className="fighter-name">{leftName}</h3>
          <div className="fight-vs">VS</div>
          <h3 className="fighter-name right">{rightName}</h3>
        </div>
      </div>
    </article>
  );
}
