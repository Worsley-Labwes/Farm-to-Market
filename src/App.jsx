import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "harvestloop-marketplace-v1";

const seedLots = [
  {
    id: "lot-1",
    farm: "Green Valley Co-op",
    farmer: "Mary Wanjiku",
    crop: "Tomatoes",
    variety: "Anna F1",
    quantity: 420,
    price: 68,
    grade: "Grade A",
    ready: "Today",
    status: "Available",
  },
  {
    id: "lot-2",
    farm: "Sunrise Family Farm",
    farmer: "Peter Otieno",
    crop: "Tomatoes",
    variety: "Roma VF",
    quantity: 280,
    price: 62,
    grade: "Grade A",
    ready: "Today",
    status: "Available",
  },
  {
    id: "lot-3",
    farm: "Kijani Growers",
    farmer: "Grace Njeri",
    crop: "Avocados",
    variety: "Hass",
    quantity: 360,
    price: 105,
    grade: "Grade A",
    ready: "Tomorrow",
    status: "Available",
  },
  {
    id: "lot-4",
    farm: "Mawingu Farm",
    farmer: "Daniel Kiptoo",
    crop: "Sweet corn",
    variety: "Sugar Pearl",
    quantity: 500,
    price: 35,
    grade: "Grade B",
    ready: "Today",
    status: "Available",
  },
  {
    id: "lot-5",
    farm: "Green Valley Co-op",
    farmer: "Mary Wanjiku",
    crop: "Avocados",
    variety: "Fuerte",
    quantity: 190,
    price: 78,
    grade: "Grade B",
    ready: "Tomorrow",
    status: "Available",
  },
  {
    id: "lot-6",
    farm: "Little River Farm",
    farmer: "Amina Hassan",
    crop: "Tomatoes",
    variety: "Anna F1",
    quantity: 240,
    price: 60,
    grade: "Grade A",
    ready: "Today",
    status: "Available",
  },
  {
    id: "lot-7",
    farm: "Kijani Growers",
    farmer: "Grace Njeri",
    crop: "Green beans",
    variety: "Serengeti",
    quantity: 300,
    price: 88,
    grade: "Grade A",
    ready: "Oct 31",
    status: "Available",
  },
];

const seedRequests = [
  {
    id: "buyer-1",
    buyer: "FreshMart Wholesale",
    crop: "Tomatoes",
    grade: "Grade A",
    quantity: 800,
    price: 75,
    pickup: "Today",
    location: "Nakuru market",
  },
  {
    id: "buyer-2",
    buyer: "Mama Ntilie Foods",
    crop: "Avocados",
    grade: "Any grade",
    quantity: 500,
    price: 120,
    pickup: "Tomorrow",
    location: "Naivasha collection point",
  },
  {
    id: "buyer-3",
    buyer: "Sunrise School Kitchens",
    crop: "Sweet corn",
    grade: "Any grade",
    quantity: 400,
    price: 42,
    pickup: "Today",
    location: "Nakuru town",
  },
  {
    id: "buyer-4",
    buyer: "Green Basket Grocers",
    crop: "Green beans",
    grade: "Grade A",
    quantity: 450,
    price: 98,
    pickup: "Oct 31",
    location: "Nakuru market",
  },
];

const defaultData = () => ({ lots: seedLots, matches: [] });

function readData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultData();
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed.lots) && Array.isArray(parsed.matches))
      return parsed;
    console.warn(
      "Saved HarvestLoop data had an unexpected format. Showing the sample marketplace.",
    );
  } catch (error) {
    console.warn(
      "Could not read saved HarvestLoop data. Showing the sample marketplace.",
      error,
    );
  }
  return defaultData();
}

const navItems = [
  { label: "Overview", icon: "grid" },
  { label: "Harvest lots", icon: "leaf" },
  { label: "Buyer board", icon: "store" },
  { label: "Collections", icon: "truck" },
];

function Icon({ name, size = 18 }) {
  const paths = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4c-8 0-14 3-14 10a6 6 0 0 0 6 6c7 0 10-6 8-16Z" />
        <path d="M4 21c3-5 7-8 12-11" />
      </>
    ),
    store: (
      <>
        <path d="M3 10v10h18V10M2 10l2-7h16l2 7" />
        <path d="M2 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M10 20v-6h4v6" />
      </>
    ),
    truck: (
      <>
        <path d="M3 6h12v12H3zM15 10h4l3 4v4h-7" />
        <circle cx="7.5" cy="19" r="1.5" />
        <circle cx="18.5" cy="19" r="1.5" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    arrow: (
      <>
        <path d="M7 17 17 7M7 7h10v10" />
      </>
    ),
    down: (
      <>
        <path d="m7 10 5 5 5-5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    close: (
      <>
        <path d="m18 6-12 12M6 6l12 12" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
        <path d="m19 14 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" />
      </>
    ),
    coins: (
      <>
        <circle cx="8" cy="8" r="5" />
        <path d="M3 8v3a5 5 0 0 0 8.5 3.5M13 16a5 5 0 1 0 5-5h-1" />
        <path d="M18 8v3h3" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function App() {
  const [data, setData] = useState(readData);
  const [page, setPage] = useState("Overview");
  const [query, setQuery] = useState("");
  const [cropFilter, setCropFilter] = useState("All crops");
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [dateFilter, setDateFilter] = useState("All harvest dates");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error(
        "Could not save HarvestLoop changes in this browser.",
        error,
      );
    }
  }, [data]);

  const availableLots = data.lots.filter((lot) => lot.status === "Available");
  const matchedLots = data.lots.filter((lot) => lot.status === "Matched");
  const totalKg = availableLots.reduce((sum, lot) => sum + lot.quantity, 0);
  const matchableRequests = seedRequests.filter((request) => {
    const volume = availableLots
      .filter(
        (lot) =>
          lot.crop === request.crop &&
          (request.grade === "Any grade" || lot.grade === request.grade),
      )
      .reduce((sum, lot) => sum + lot.quantity, 0);
    return volume >= request.quantity;
  });

  const visibleLots = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return data.lots.filter((lot) => {
      const matchesSearch =
        `${lot.crop} ${lot.variety} ${lot.farm} ${lot.farmer}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCrop = cropFilter === "All crops" || lot.crop === cropFilter;
      const matchesDate =
        dateFilter === "All harvest dates" || lot.ready === dateFilter;
      const matchesStatus =
        page !== "Harvest lots" || lot.status === "Available";
      return matchesSearch && matchesCrop && matchesDate && matchesStatus;
    });
  }, [cropFilter, data.lots, dateFilter, page, query]);

  function navigate(label) {
    setPage(label);
    setSidebarOpen(false);
    setNotice("");
    setQuery("");
    setCropFilter("All crops");
  }

  function addLot(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lot = {
      id: globalThis.crypto?.randomUUID?.() || `lot-${Date.now()}`,
      farm: String(form.get("farm")).trim(),
      farmer: String(form.get("farmer")).trim(),
      crop: String(form.get("crop")),
      variety: String(form.get("variety")).trim() || "Mixed variety",
      quantity: Number(form.get("quantity")),
      price: Number(form.get("price")),
      grade: String(form.get("grade")),
      ready: String(form.get("ready")),
      status: "Available",
    };
    if (!lot.farm || !lot.farmer || lot.quantity <= 0 || lot.price <= 0) {
      setNotice("Please enter a farm, farmer, and valid quantity and price.");
      return;
    }
    setData((current) => ({ ...current, lots: [lot, ...current.lots] }));
    setModalOpen(false);
    setPage("Harvest lots");
    setNotice(
      `${lot.quantity.toLocaleString()} kg of ${lot.crop.toLowerCase()} added to the market.`,
    );
  }

  function matchRequest(request) {
    const eligible = data.lots
      .filter(
        (lot) =>
          lot.status === "Available" &&
          lot.crop === request.crop &&
          (request.grade === "Any grade" || lot.grade === request.grade),
      )
      .sort((a, b) => a.price - b.price);
    const selected = [];
    let total = 0;
    for (const lot of eligible) {
      selected.push(lot);
      total += lot.quantity;
      if (total >= request.quantity) break;
    }
    if (total < request.quantity) {
      setNotice(
        `Not quite enough ${request.crop.toLowerCase()} for this order yet. More harvest may arrive soon.`,
      );
      return;
    }
    const match = {
      id: globalThis.crypto?.randomUUID?.() || `match-${Date.now()}`,
      buyerId: request.id,
      buyer: request.buyer,
      crop: request.crop,
      requestedKg: request.quantity,
      lots: selected.map((lot) => lot.id),
      pickup: request.pickup,
      location: request.location,
      price: request.price,
    };
    setData((current) => ({
      ...current,
      lots: current.lots.map((lot) =>
        selected.some((item) => item.id === lot.id)
          ? {
              ...lot,
              status: "Matched",
              buyer: request.buyer,
              pickup: request.pickup,
              location: request.location,
            }
          : lot,
      ),
      matches: [...current.matches, match],
    }));
    setNotice(
      `${request.crop} matched to ${request.buyer}. ${selected.length > 1 ? `${selected.length} growers are pooling this order.` : "Your collection is ready to coordinate."}`,
    );
  }

  function releaseMatch(match) {
    setData((current) => ({
      ...current,
      lots: current.lots.map((lot) =>
        match.lots.includes(lot.id)
          ? {
              ...lot,
              status: "Available",
              buyer: undefined,
              pickup: undefined,
              location: undefined,
            }
          : lot,
      ),
      matches: current.matches.filter((item) => item.id !== match.id),
    }));
    setNotice(
      `${match.crop} order released; the harvest is back on the buyer board.`,
    );
  }

  function exportLots() {
    const rows = [
      [
        "Crop",
        "Variety",
        "Farm",
        "Farmer",
        "Available kg",
        "Asking price (KSh/kg)",
        "Grade",
        "Harvest ready",
        "Status",
        "Buyer",
      ],
      ...visibleLots.map((lot) => [
        lot.crop,
        lot.variety,
        lot.farm,
        lot.farmer,
        lot.quantity,
        lot.price,
        lot.grade,
        lot.ready,
        lot.status,
        lot.buyer || "",
      ]),
    ];
    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "harvestloop-harvest-lots.csv";
    link.click();
    URL.revokeObjectURL(url);
    setNotice(`Exported ${visibleLots.length} harvest lots to CSV.`);
  }

  const dateLabel = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
  const titles = {
    Overview: [
      "Good morning, Mary.",
      "Let’s get good food moving. See what’s ready, what buyers need, and which harvests can travel together.",
    ],
    "Harvest lots": [
      "Ready from the farm.",
      "List fresh harvests, see what’s available, and bring nearby growers together.",
    ],
    "Buyer board": [
      "Find the right buyer.",
      "Real demand first. Pool compatible harvests to meet an order, without leaving any one grower behind.",
    ],
    Collections: [
      "From field to pickup.",
      "Keep each matched order, its growers, and its collection point in one calm place.",
    ],
  };

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <a
          className="brand"
          href="#overview"
          onClick={() => navigate("Overview")}
        >
          <span className="brand-mark">
            <Icon name="leaf" size={21} />
          </span>
          <span>
            harvest<span className="brand-light">loop</span>
            <small>FARM TO MARKET</small>
          </span>
        </a>
        <div className="nav-label">GROW TOGETHER</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon }) => (
            <button
              key={label}
              className={`nav-link ${page === label ? "nav-link-active" : ""}`}
              aria-current={page === label ? "page" : undefined}
              onClick={() => navigate(label)}
            >
              <Icon name={icon} />
              <span>{label}</span>
              {label === "Harvest lots" && (
                <span className="nav-count">{availableLots.length}</span>
              )}
              {label === "Collections" && matchedLots.length > 0 && (
                <span className="nav-count">{matchedLots.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <span className="note-icon">
            <Icon name="spark" size={18} />
          </span>
          <p>Better together.</p>
          <span>One farm has a harvest. A whole community has a market.</span>
          <span className="note-decoration" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="profile-card">
          <span className="profile-avatar">MW</span>
          <span>
            <strong>Mary Wanjiku</strong>
            <small>Green Valley Co-op</small>
          </span>
          <span className="online-dot" />
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            aria-label="Open navigation"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
          >
            <Icon name="menu" />
          </button>
          <div className="breadcrumb">
            Green Valley Co-op <span>/</span>
            <strong>{page}</strong>
          </div>
          <div className="topbar-actions">
            <span className="market-pill">
              <i /> NAKURU MARKET
            </span>
            <span className="top-avatar">MW</span>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> {dateLabel.toUpperCase()}{" "}
                <span className="eyebrow-divider">·</span> HARVEST SEASON
              </div>
              <h1>{titles[page][0]}</h1>
              <p className="welcome-copy">{titles[page][1]}</p>
            </div>
            <button
              className="primary-button"
              onClick={() => setModalOpen(true)}
            >
              <Icon name="plus" size={17} /> List a harvest
            </button>
          </section>

          {notice && (
            <div className="notice" role="status">
              <Icon name="check" size={16} />
              {notice}
              <button
                aria-label="Dismiss message"
                onClick={() => setNotice("")}
              >
                <Icon name="close" size={15} />
              </button>
            </div>
          )}

          {page === "Overview" && (
            <Overview
              availableLots={availableLots}
              totalKg={totalKg}
              matchableRequests={matchableRequests}
              matchedLots={matchedLots}
              navigate={navigate}
              matchRequest={matchRequest}
            />
          )}
          {page === "Harvest lots" && (
            <LotsPage
              lots={visibleLots}
              totalLots={data.lots.length}
              query={query}
              setQuery={setQuery}
              cropFilter={cropFilter}
              setCropFilter={setCropFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              onExport={exportLots}
            />
          )}
          {page === "Buyer board" && (
            <BuyerBoard
              requests={seedRequests}
              lots={availableLots}
              matches={data.matches}
              onMatch={matchRequest}
            />
          )}
          {page === "Collections" && (
            <CollectionsPage
              matches={data.matches}
              lots={data.lots}
              onRelease={releaseMatch}
            />
          )}

          <footer className="page-footer">
            <span>Good food deserves a good journey.</span>
            <span>✿ &nbsp; HARVESTLOOP · DEMO MARKETPLACE</span>
          </footer>
        </div>
      </main>

      {modalOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false);
          }}
        >
          <section
            className="lot-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-heading">
              <span className="modal-icon">
                <Icon name="leaf" size={20} />
              </span>
              <button
                className="icon-button"
                aria-label="Close dialog"
                onClick={() => setModalOpen(false)}
              >
                <Icon name="close" />
              </button>
            </div>
            <h2 id="modal-title">Bring your harvest to market.</h2>
            <p>A clear listing makes it easier for nearby buyers to say yes.</p>
            <form onSubmit={addLot}>
              <div className="form-grid">
                <label>
                  Farm or co-op name
                  <input
                    name="farm"
                    placeholder="e.g. Green Valley Co-op"
                    defaultValue="Green Valley Co-op"
                    required
                  />
                </label>
                <label>
                  Farmer’s name
                  <input
                    name="farmer"
                    placeholder="e.g. Mary Wanjiku"
                    required
                  />
                </label>
                <label>
                  What are you growing?
                  <select name="crop" defaultValue="Tomatoes">
                    <option>Tomatoes</option>
                    <option>Avocados</option>
                    <option>Sweet corn</option>
                    <option>Green beans</option>
                    <option>Potatoes</option>
                    <option>Onions</option>
                    <option>Other</option>
                  </select>
                </label>
                <label>
                  Variety
                  <input name="variety" placeholder="e.g. Anna F1" />
                </label>
                <label>
                  Available quantity (kg)
                  <input
                    name="quantity"
                    type="number"
                    min="1"
                    placeholder="e.g. 300"
                    required
                  />
                </label>
                <label>
                  Asking price (KSh/kg)
                  <input
                    name="price"
                    type="number"
                    min="1"
                    placeholder="e.g. 65"
                    required
                  />
                </label>
                <label>
                  Quality grade
                  <select name="grade">
                    <option>Grade A</option>
                    <option>Grade B</option>
                  </select>
                </label>
                <label>
                  Harvest ready
                  <select name="ready">
                    <option>Today</option>
                    <option>Tomorrow</option>
                    <option>Oct 31</option>
                    <option>Nov 1</option>
                  </select>
                </label>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setModalOpen(false)}
                >
                  Not now
                </button>
                <button type="submit" className="primary-button">
                  <Icon name="plus" size={16} /> Add harvest lot
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function Overview({
  availableLots,
  totalKg,
  matchableRequests,
  matchedLots,
  navigate,
  matchRequest,
}) {
  const availableValue = availableLots.reduce(
    (sum, lot) => sum + lot.quantity * lot.price,
    0,
  );
  return (
    <>
      <section className="stats-grid" aria-label="Market summary">
        <StatCard
          icon="leaf"
          label="READY TO SELL"
          value={`${totalKg.toLocaleString()} kg`}
          note={`${availableLots.length} harvest lots across the co-op`}
          tone="green-icon"
        />
        <StatCard
          icon="coins"
          label="GROWER ASKING VALUE"
          value={formatMoney(availableValue)}
          note="Based on listed asking prices"
          tone="gold-icon"
        />
        <StatCard
          icon="store"
          label="BUYER ORDERS TO FILL"
          value={matchableRequests.length}
          note="Demand we can meet by pooling"
          tone="blue-icon"
        />
      </section>

      <section className="feature-banner">
        <div className="feature-icon">
          <Icon name="spark" size={21} />
        </div>
        <div>
          <span className="feature-kicker">GROWERS, MEET THE MARKET</span>
          <h2>Small harvests can fill a big order.</h2>
          <p>
            We found {matchableRequests.length} buyer{" "}
            {matchableRequests.length === 1 ? "request" : "requests"} your co-op
            could fill by bringing compatible lots together.
          </p>
        </div>
        <button
          className="banner-button"
          onClick={() => navigate("Buyer board")}
        >
          See the matches <Icon name="arrow" size={15} />
        </button>
        <span className="banner-orbit orbit-one" />
        <span className="banner-orbit orbit-two" />
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Ready for a buyer</h2>
            <p>Live harvest lots from your grower network.</p>
          </div>
          <button
            className="text-button"
            onClick={() => navigate("Harvest lots")}
          >
            All harvest lots <Icon name="arrow" size={15} />
          </button>
        </div>
        <div className="table-card">
          <LotTable lots={availableLots.slice(0, 5)} compact />
        </div>
      </section>

      <section className="bottom-grid">
        <div className="buyer-preview">
          <div className="section-heading">
            <div>
              <h2>Market needs</h2>
              <p>Requests from buyers near you.</p>
            </div>
            <span className="live-tag">
              <i /> OPEN
            </span>
          </div>
          {matchableRequests.slice(0, 2).map((request) => (
            <BuyerMiniCard
              key={request.id}
              request={request}
              onMatch={() => matchRequest(request)}
            />
          ))}
          <button
            className="quiet-link"
            onClick={() => navigate("Buyer board")}
          >
            Explore the buyer board <Icon name="arrow" size={14} />
          </button>
        </div>
        <div className="collection-preview">
          <div className="section-heading">
            <div>
              <h2>On the move</h2>
              <p>Confirmed harvest matches.</p>
            </div>
            <span className="mini-icon orange-icon">
              <Icon name="truck" size={17} />
            </span>
          </div>
          {matchedLots.length ? (
            <div className="collection-summary">
              <span className="collection-number">{matchedLots.length}</span>
              <div>
                <strong>harvest lots matched</strong>
                <p>
                  {new Set(matchedLots.map((lot) => lot.buyer)).size} buyer
                  orders ready for pickup coordination.
                </p>
              </div>
            </div>
          ) : (
            <div className="empty-mini">
              <Icon name="truck" size={19} />
              <span>No collections yet. Match a harvest to get moving.</span>
            </div>
          )}
          <button
            className="quiet-link"
            onClick={() => navigate("Collections")}
          >
            View collections <Icon name="arrow" size={14} />
          </button>
        </div>
      </section>
    </>
  );
}

function StatCard({ icon, label, value, note, tone }) {
  return (
    <article className="stat-card">
      <span className={`stat-icon ${tone}`}>
        <Icon name={icon} size={19} />
      </span>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      <span className="stat-note">{note}</span>
    </article>
  );
}

function LotsPage({
  lots,
  totalLots,
  query,
  setQuery,
  cropFilter,
  setCropFilter,
  dateFilter,
  setDateFilter,
  onExport,
}) {
  const cropOptions = [
    "All crops",
    ...new Set(seedLots.map((lot) => lot.crop)),
  ];
  return (
    <section className="section-block lots-section">
      <div className="section-heading">
        <div>
          <h2>The harvest list</h2>
          <p>
            Every lot stays visible, whether it’s waiting or matched to a buyer.
          </p>
        </div>
        <button className="text-button" onClick={onExport}>
          Export CSV <Icon name="arrow" size={14} />
        </button>
      </div>
      <div className="table-card">
        <div className="toolbar">
          <label className="search-box">
            <Icon name="search" size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search crops, farms, growers..."
              aria-label="Search harvest lots"
            />
          </label>
          <label className="select-filter">
            <span>Crop</span>
            <select
              value={cropFilter}
              onChange={(event) => setCropFilter(event.target.value)}
            >
              {cropOptions.map((crop) => (
                <option key={crop}>{crop}</option>
              ))}
            </select>
            <Icon name="down" size={14} />
          </label>
          <label className="select-filter">
            <span>Ready</span>
            <select
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
            >
              {["All harvest dates", "Today", "Tomorrow", "Oct 31"].map(
                (date) => (
                  <option key={date}>{date}</option>
                ),
              )}
            </select>
            <Icon name="down" size={14} />
          </label>
        </div>
        <LotTable lots={lots} />
        {lots.length === 0 && (
          <div className="empty-state">
            <Icon name="leaf" size={24} />
            <strong>No matching harvests</strong>
            <p>Try a different search or list a new crop.</p>
          </div>
        )}
        <div className="table-footer">
          Showing <strong>{lots.length}</strong> of <strong>{totalLots}</strong>{" "}
          harvest lots <span>· &nbsp; Quantities shown in kilograms</span>
        </div>
      </div>
    </section>
  );
}

function LotTable({ lots, compact = false }) {
  if (!lots.length)
    return (
      <div className="empty-state">
        <Icon name="leaf" size={24} />
        <strong>No harvest lots yet</strong>
        <p>Add a crop to help it find its way to market.</p>
      </div>
    );
  return (
    <div className="table-scroll">
      <table className={`lot-table ${compact ? "compact-table" : ""}`}>
        <thead>
          <tr>
            <th>PRODUCE</th>
            <th>GROWER</th>
            <th>QUANTITY</th>
            <th>ASKING PRICE</th>
            <th>READY</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {lots.map((lot) => (
            <tr key={lot.id}>
              <td>
                <div className="produce-cell">
                  <span className={`produce-icon crop-${cropSlug(lot.crop)}`}>
                    {cropEmoji(lot.crop)}
                  </span>
                  <span>
                    <strong>{lot.crop}</strong>
                    <small>
                      {lot.variety} · {lot.grade}
                    </small>
                  </span>
                </div>
              </td>
              <td>
                <div className="grower-cell">
                  <strong>{lot.farm}</strong>
                  <small>{lot.farmer}</small>
                </div>
              </td>
              <td>
                <strong className="quantity-cell">
                  {lot.quantity.toLocaleString()} <small>kg</small>
                </strong>
              </td>
              <td>
                <strong className="price-cell">
                  {formatMoney(lot.price)}
                  <small> / kg</small>
                </strong>
              </td>
              <td>
                <span className="ready-label">
                  <Icon name="clock" size={13} />
                  {lot.ready}
                </span>
              </td>
              <td>
                <span
                  className={`status-pill ${lot.status === "Matched" ? "matched-status" : "available-status"}`}
                >
                  <i />
                  {lot.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BuyerBoard({ requests, lots, matches, onMatch }) {
  const activeRequests = requests.filter(
    (request) => !matches.some((match) => match.buyerId === request.id),
  );
  return (
    <section className="section-block">
      <div className="section-heading">
        <div>
          <h2>What buyers are looking for</h2>
          <p>
            Match one grower or pool nearby harvests to meet the whole order.
          </p>
        </div>
        <span className="buyer-board-count">
          {activeRequests.length} open requests
        </span>
      </div>
      <div className="buyer-grid">
        {activeRequests.map((request) => {
          const eligibleLots = lots.filter(
            (lot) =>
              lot.crop === request.crop &&
              (request.grade === "Any grade" || lot.grade === request.grade),
          );
          const eligibleKg = eligibleLots.reduce(
            (sum, lot) => sum + lot.quantity,
            0,
          );
          const canMatch = eligibleKg >= request.quantity;
          const progress = Math.min(
            100,
            Math.round((eligibleKg / request.quantity) * 100),
          );
          return (
            <article className="buyer-card" key={request.id}>
              <div className="buyer-card-top">
                <span className={`produce-icon crop-${cropSlug(request.crop)}`}>
                  {cropEmoji(request.crop)}
                </span>
                <span className="buyer-open-label">
                  <i /> OPEN REQUEST
                </span>
              </div>
              <h2>{request.buyer}</h2>
              <span className="buyer-crop">
                {request.crop} <span>· {request.grade}</span>
              </span>
              <div className="buyer-order">
                <span>
                  <small>NEEDS</small>
                  <strong>
                    {request.quantity.toLocaleString()} <small>kg</small>
                  </strong>
                </span>
                <span>
                  <small>OFFERING</small>
                  <strong className="offer-price">
                    {formatMoney(request.price)}
                    <small> / kg</small>
                  </strong>
                </span>
              </div>
              <div className="buyer-fit">
                <div>
                  <span>
                    {eligibleLots.length} compatible{" "}
                    {eligibleLots.length === 1 ? "lot" : "lots"}
                  </span>
                  <strong>
                    {eligibleKg.toLocaleString()} /{" "}
                    {request.quantity.toLocaleString()} kg
                  </strong>
                </div>
                <div className="fit-track">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>
              <div className="buyer-meta">
                <span>
                  <Icon name="clock" size={14} />
                  Pickup {request.pickup}
                </span>
                <span>
                  <Icon name="pin" size={14} />
                  {request.location}
                </span>
              </div>
              <button
                className={`match-button ${canMatch ? "" : "match-disabled"}`}
                onClick={() => canMatch && onMatch(request)}
                disabled={!canMatch}
              >
                {canMatch ? (
                  <>
                    <Icon name="spark" size={15} /> Match harvest
                    {eligibleLots.length > 1 ? "s together" : ""}
                  </>
                ) : (
                  `Need ${Math.max(0, request.quantity - eligibleKg).toLocaleString()} kg more`
                )}
                <Icon name="arrow" size={14} />
              </button>
            </article>
          );
        })}
      </div>
      {activeRequests.length === 0 && (
        <div className="empty-state board-empty">
          <Icon name="check" size={25} />
          <strong>Every buyer order is matched!</strong>
          <p>Keep listing fresh harvests to unlock new opportunities.</p>
        </div>
      )}
      <div className="pooling-note">
        <span className="pooling-icon">
          <Icon name="spark" size={16} />
        </span>
        <p>
          <strong>Why pool?</strong> Nearby growers can combine smaller lots to
          meet a buyer’s volume or quality needs. Each grower’s quantity and
          asking price stays visible in the collection record.
        </p>
      </div>
    </section>
  );
}

function BuyerMiniCard({ request, onMatch }) {
  return (
    <article className="buyer-mini">
      <span className={`produce-icon crop-${cropSlug(request.crop)}`}>
        {cropEmoji(request.crop)}
      </span>
      <span className="buyer-mini-copy">
        <strong>{request.buyer}</strong>
        <small>
          {request.quantity} kg {request.crop.toLowerCase()} ·{" "}
          {formatMoney(request.price)}/kg
        </small>
      </span>
      <button
        onClick={onMatch}
        aria-label={`Match harvest to ${request.buyer}`}
      >
        <Icon name="arrow" size={15} />
      </button>
    </article>
  );
}

function CollectionsPage({ matches, lots, onRelease }) {
  if (!matches.length)
    return (
      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Your collection board</h2>
            <p>
              Once a buyer order is matched, the harvest is ready for pickup
              planning here.
            </p>
          </div>
        </div>
        <div className="empty-collections">
          <span className="empty-truck">
            <Icon name="truck" size={25} />
          </span>
          <h2>Nothing on the road just yet.</h2>
          <p>
            Head to the buyer board to pool harvests and match your first order.
          </p>
        </div>
      </section>
    );
  return (
    <section className="section-block">
      <div className="section-heading">
        <div>
          <h2>Collection planning</h2>
          <p>Matched orders and the growers contributing to each pickup.</p>
        </div>
        <span className="buyer-board-count">
          {matches.length} planned{" "}
          {matches.length === 1 ? "collection" : "collections"}
        </span>
      </div>
      <div className="collection-list">
        {matches.map((match, index) => {
          const contributingLots = lots.filter((lot) =>
            match.lots.includes(lot.id),
          );
          const pledgedKg = contributingLots.reduce(
            (sum, lot) => sum + lot.quantity,
            0,
          );
          return (
            <article className="collection-card" key={match.id}>
              <div className="collection-card-head">
                <span
                  className={`route-number ${index % 2 ? "route-alt" : ""}`}
                >
                  0{index + 1}
                </span>
                <div className="collection-title">
                  <span className="status-pill matched-status">
                    <i /> Matched
                  </span>
                  <h2>
                    {match.crop} for {match.buyer}
                  </h2>
                  <p>
                    <Icon name="pin" size={14} />
                    {match.location} <span>·</span>{" "}
                    <Icon name="clock" size={14} />
                    Pickup {match.pickup}
                  </p>
                </div>
                <div className="collection-quantity">
                  <strong>{pledgedKg.toLocaleString()} kg</strong>
                  <small>pledged · {formatMoney(match.price)}/kg offer</small>
                </div>
                <button
                  className="release-button"
                  onClick={() => onRelease(match)}
                  title="Release this match and return the lots to the market"
                >
                  Release
                </button>
              </div>
              <div className="grower-contributions">
                <span className="contribution-label">
                  GROWERS IN THIS PICKUP
                </span>
                {contributingLots.map((lot) => (
                  <div className="contribution-row" key={lot.id}>
                    <span className="grower-initials">
                      {lot.farmer
                        .split(/\s+/)
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </span>
                    <strong>{lot.farmer}</strong>
                    <span>{lot.farm}</span>
                    <strong className="contribution-weight">
                      {lot.quantity.toLocaleString()} kg
                    </strong>
                    <span>{lot.grade}</span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <div className="route-note">
        <Icon name="truck" size={18} />
        <div>
          <strong>A note about collections</strong>
          <p>
            These are suggested grower groupings based on buyer demand—not
            booked transport. Coordinate vehicles and delivery terms with the
            buyer before harvest leaves the farm.
          </p>
        </div>
      </div>
    </section>
  );
}

function formatMoney(value) {
  return `KSh ${Number(value).toLocaleString("en-KE")}`;
}

function cropSlug(crop) {
  return crop.toLowerCase().replaceAll(" ", "-");
}

function cropEmoji(crop) {
  const icons = {
    Tomatoes: "🍅",
    Avocados: "🥑",
    "Sweet corn": "🌽",
    "Green beans": "🫛",
    Potatoes: "🥔",
    Onions: "🧅",
  };
  return icons[crop] || "🌱";
}

export default App;
