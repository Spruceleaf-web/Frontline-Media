window.addEventListener('DOMContentLoaded', () => {
  /* ---------- Element references ---------- */
  const sidebarToggle      = document.getElementById('sidebarToggle');
  const sidebar            = document.getElementById('sidebar');
  const darkModeToggle     = document.getElementById('darkModeToggle');
  const autoRefreshToggle  = document.getElementById('autoRefreshToggle');

  /* ---------- Sidebar open / close ---------- */
  sidebarToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  /* ---------- Dark‑mode ---------- */
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.checked = true;
  }

  darkModeToggle?.addEventListener('change', (e) => {
    if (e.target.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  });

  /* ---------- Auto‑refresh ---------- */
  let autoRefreshInterval = null;

  function startAutoRefresh() {
    if (!autoRefreshInterval) {
      autoRefreshInterval = setInterval(() => location.reload(), 30000); // 30 s
    }
  }

  function stopAutoRefresh() {
    clearInterval(autoRefreshInterval);
    autoRefreshInterval = null;
  }

  // Load saved preference
  if (localStorage.getItem('autoRefresh') === 'enabled') {
    autoRefreshToggle.checked = true;
    startAutoRefresh();
  }

  autoRefreshToggle?.addEventListener('change', (e) => {
    if (e.target.checked) {
      localStorage.setItem('autoRefresh', 'enabled');
      startAutoRefresh();
    } else {
      localStorage.setItem('autoRefresh', 'disabled');
      stopAutoRefresh();
    }
  });

  /* ---------- Latest‑news ticker ---------- */
    // Articles list
  window.allArticles = [
    "Aliens Invade Local Pizzeria, Demand Extra Cheese",
    "Scientists Confirm Cats Are Secretly Running The Internet",
    "New Study Reveals Dogs Can Understand Quantum Physics",
    "Politician Accidentally Admits They’re A Robot",
    "Breaking: Pizza Now Considered A Vegetable, World Celebrates",
    "Internet Goes Down For 5 Minutes, Civilization Almost Ends",
    "Local Man Claims He Invented Time Travel Using Only A Toaster",
    "Coffee Shops Now Serving Energy In Liquid Form, Literally",
    "Experts Baffled By The Sudden Rise Of Dancing Avocados",
    "Government Accidentally Declares Monday An Official Holiday",
    "Study Shows People Actually Read Terms And Conditions (Rare!)",
    "New App Matches You With Your Spirit Meme",
    "Scientists Train Squirrels To Deliver Mail, Chaos Ensues",
    "Local Cat Runs For Mayor, Wins By Landslide",
    "New Law Requires Everyone To Wear Socks On Their Hands",
    "World's First Invisible Vehicle Invented, Riders Confused",
    "Alien Life Confirmed To Be Huge Fans Of TikTok Challenges",
    "Pizza Delivery Robots Develop Own Language, Refuse To Work",
    "Area Man Obsessed With Collecting Virtual Rocks, Experts Concerned",
    "New Trend: Wearing Sunglasses At Night To Boost IQ",
    "Study Finds Eating Dessert For Breakfast Improves Productivity",
    "Internet Memes Now Official Currency In Small Island Nation",
    "Local Dog Becomes Social Media Star Overnight",
    "Scientists Discover Plants Can Text Each Other, Using Leaves",
    "City Council Accidentally Approves Building Entirely Made Of Food",
    "Aliens Open First Coffee Shop on Mars",
    "Cats Launch Start‑Up to Deliver Pizza by Drone",
    "Government Announces Time Travel Tax Refund Program",
    "Internet Breaks as Dogs Become Influencers on TikTok",
    "Scientists Teach Robots to Brew Perfect Coffee",
    "Holiday Declared After Avocado Shortage Sparks Panic",
    "Squirrels Hack Internet to Steal Dessert Recipes",
    "Local Man Builds Vehicle Powered by Pizza Grease",
    "Plants Start Meme Trend by Posting Selfies at Dawn",
    "Rock Collectors Discover Alien Message in Ordinary Rocks",
    "Robot Mayor Orders Mandatory Sunglasses After Dark",
    "New Currency Made of Food Causes Sticky Situation",
    "Cats Form Government, Pass Universal Nap Law",
    "Dogs Win Vehicle Race Without Leaving the Internet",
    "Scientists Reveal Coffee Plants Can Text Each Other Emojis",
    "Holiday Resort Offers Time Travel Package—Return Optional",
    "Aliens Review Local Food, Give It Five Tentacles",
    "Sunglasses Become Official Currency in Fashion District",
    "Dessert Forecast Predicts Snowcone Storm This Friday",
    "Government Robots Accidentally Start Meme War Online",
    "Avocado‑Powered Vehicle Sets New Speed Record",
    "Dogs Demand Socks Tax in Exchange for Belly Rubs",
    "Internet Votes Plants as Cutest Life‑Form in Galaxy",
    "Time Travel Mishap Turns Pizzeria into Dinosaur Sanctuary",
    "Currency Market Crashes After Cats Launch PawCoin"
  ];

  // You must have a global `allArticles` array available.
  if (!window.allArticles || !allArticles.length) {
    console.warn('allArticles array missing – ticker disabled.');
    return;
  }

  // Create and style ticker if not present
  let ticker = document.getElementById('latestNewsTicker');
  if (!ticker) {
    ticker = document.createElement('div');
    ticker.id  = 'latestNewsTicker';
    ticker.style.background   = '#d33';
    ticker.style.color        = '#fff';
    ticker.style.padding      = '0.5rem 1rem';
    ticker.style.marginTop    = '1rem';
    ticker.style.borderRadius = '8px';
    ticker.style.fontWeight   = 'bold';
    ticker.style.fontSize     = '1rem';
    ticker.style.cursor       = 'pointer';
    ticker.style.userSelect   = 'none';
    sidebar.appendChild(ticker);
  }

  function updateTicker() {
    const headline = allArticles[Math.floor(Math.random() * allArticles.length)];
    ticker.textContent = `LATEST NEWS: ${headline}`;
    ticker.dataset.headline = headline;
  }

  // clicking ticker opens article
  ticker.addEventListener('click', () => {
    const h = ticker.dataset.headline;
    if (h) window.location.href = `article.html?headline=${encodeURIComponent(h)}`;
  });

  // initial + interval
  updateTicker();
  setInterval(updateTicker, 10000); // update every 10 s
});