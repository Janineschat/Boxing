const API_BASE = "https://boxing-data-api.p.rapidapi.com/v2";
const API_HOST = "boxing-data-api.p.rapidapi.com";
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY || "";

const imageMap = {
  "Oleksandr Usyk": "/images/usyk.jpg",
  "Tyson Fury": "/images/fury.jpg",
  "Anthony Joshua": "/images/joshua.jpg",
  "Canelo Alvarez": "/images/canelo.jpg",
  "Terence Crawford": "/images/crawford.jpg",
  "Naoya Inoue": "/images/inoue.jpg",
  "Gervonta Davis": "/images/davis.jpg",
  "Gervonta 'Tank' Davis": "/images/davis.jpg",
};

export function getFighterImage(name) {
  return imageMap[name] || "/images/logo.jpg";
}

export function getFromPaths(object, paths) {
  for (const path of paths) {
    const value = path.split(".").reduce((acc, key) => acc?.[key], object);
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }
  return null;
}

export function normalizeArray(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;
  return [];
}

export function formatDate(value) {
  if (!value) return "Datum onbekend";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fightDateValue(fight) {
  const rawDate = getFromPaths(fight, [
    "date",
    "event_date",
    "start_time",
    "datetime",
    "event.date",
  ]);
  const time = new Date(rawDate || 0).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

async function requestApi(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST,
    },
  });

  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

export async function fetchMostRecentFight(fighter, searchTerm) {
  const fighterId = fighter?.id || fighter?._id;
  const fighterName = fighter?.name || searchTerm;

  const candidatePaths = [
    fighterId ? `/fighters/${fighterId}/fights?page_num=1&page_size=20` : null,
    `/fights?fighter_name=${encodeURIComponent(fighterName)}&page_num=1&page_size=20`,
    `/fights?search=${encodeURIComponent(fighterName)}&page_num=1&page_size=20`,
    `/results?search=${encodeURIComponent(fighterName)}&page_num=1&page_size=20`,
  ].filter(Boolean);

  let collected = [];
  for (const path of candidatePaths) {
    try {
      const result = await requestApi(path);
      if (!result.ok) continue;
      const items = normalizeArray(result.data);
      if (items.length) {
        collected = items;
        break;
      }
    } catch (error) {
      console.error("Fight endpoint fout:", path, error);
    }
  }

  if (!collected.length) return null;

  const normalizedName = normalizeText(fighterName);
  const normalizedSearch = normalizeText(searchTerm);

  const filtered = collected.filter((fight) => {
    const ids = [
      getFromPaths(fight, [
        "fighter_1.id",
        "fighter1.id",
        "red_corner.id",
        "home.id",
        "fighters.0.id",
      ]),
      getFromPaths(fight, [
        "fighter_2.id",
        "fighter2.id",
        "blue_corner.id",
        "away.id",
        "fighters.1.id",
      ]),
    ]
      .filter(Boolean)
      .map((id) => String(id));

    const names = [
      getFromPaths(fight, [
        "fighter_1.name",
        "fighter1.name",
        "red_corner.name",
        "home.name",
        "fighters.0.name",
      ]),
      getFromPaths(fight, [
        "fighter_2.name",
        "fighter2.name",
        "blue_corner.name",
        "away.name",
        "fighters.1.name",
      ]),
    ]
      .filter(Boolean)
      .map((n) => normalizeText(n));

    const idMatch = fighterId ? ids.includes(String(fighterId)) : false;
    const nameMatch = names.some(
      (n) =>
        n === normalizedName ||
        n.includes(normalizedName) ||
        normalizedName.includes(n),
    );
    const searchMatch = normalizedSearch
      ? names.some(
          (n) =>
            n === normalizedSearch ||
            n.includes(normalizedSearch) ||
            normalizedSearch.includes(n),
        )
      : false;

    return idMatch || nameMatch || searchMatch;
  });

  if (!filtered.length) return null;

  const sorted = filtered.sort((a, b) => fightDateValue(b) - fightDateValue(a));
  return sorted[0] || null;
}

export function parseFightDisplay(fight, fighterName) {
  const eventName =
    getFromPaths(fight, ["event_name", "event.title", "event", "title"]) ||
    `Recent gevecht van ${fighterName}`;
  const location =
    getFromPaths(fight, ["venue", "location", "event.location", "city"]) ||
    "Locatie onbekend";
  const date = formatDate(
    getFromPaths(fight, ["date", "event_date", "start_time", "datetime"]),
  );
  const leftName =
    getFromPaths(fight, [
      "fighter_1.name",
      "fighter1.name",
      "red_corner.name",
      "home.name",
      "fighters.0.name",
    ]) || fighterName;
  const rightName =
    getFromPaths(fight, [
      "fighter_2.name",
      "fighter2.name",
      "blue_corner.name",
      "away.name",
      "fighters.1.name",
    ]) || "Tegenstander";
  const cardType =
    getFromPaths(fight, ["card_type", "fight_type", "stage", "status"]) ||
    "Resultaat";

  return { eventName, location, date, leftName, rightName, cardType };
}

export async function searchFightersByName(searchTerm) {
  const response = await requestApi(
    `/fighters?name=${encodeURIComponent(searchTerm)}&page_num=1&page_size=10`,
  );
  return response;
}

export function mapFighterCard(fighter) {
  const name = fighter.name || "Onbekende naam";
  const nationality = fighter.nationality || "Onbekend";
  const division =
    fighter.division?.name || fighter.weight_class || "Onbekend";
  const wins = fighter.stats?.wins ?? fighter.record?.wins ?? "?";
  const losses = fighter.stats?.losses ?? fighter.record?.losses ?? "?";
  const draws = fighter.stats?.draws ?? fighter.record?.draws ?? "?";

  return {
    fighter,
    name,
    nationality,
    division,
    record: `${wins}-${losses}-${draws}`,
    image: getFighterImage(name),
  };
}
