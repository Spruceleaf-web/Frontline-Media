// Helpers for keywords and images (expects window.keywordImageMap from images.js)
function getKeywordsFromHeadline(headline) {
    const possibleKeywords = Object.keys(window.keywordImageMap);
    const headlineLower = headline.toLowerCase();
  
    let matched = possibleKeywords.filter(kw => headlineLower.includes(kw));
    if (matched.length === 0) {
      matched = ["internet"]; // fallback keyword
    }
    return matched;
  }
  
  function getImageForHeadline(headline) {
    const keywords = getKeywordsFromHeadline(headline);
    const images = window.keywordImageMap[keywords[0]];
    return images[Math.floor(Math.random() * images.length)];
  }
  
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
    "World's First Invisible Bike Invented, Riders Confused",
    "Alien Life Confirmed To Be Huge Fans Of TikTok Challenges",
    "Pizza Delivery Robots Develop Own Language, Refuse To Work",
    "Area Man Obsessed With Collecting Virtual Rocks, Experts Concerned",
    "New Trend: Wearing Sunglasses At Night To Boost IQ",
    "Study Finds Eating Ice Cream For Breakfast Improves Productivity",
    "Internet Memes Now Official Currency In Small Island Nation",
    "Local Dog Becomes Social Media Star Overnight",
    "Scientists Discover Plants Can Text Each Other, Using Leaves",
    "City Council Accidentally Approves Building Entirely Made Of Jello"
  ];
  
  // Pick 5 unique random articles
  function pickRandomArticles(count = 5) {
    const copy = [...allArticles];
    const picked = [];
    for (let i = 0; i < count && copy.length > 0; i++) {
      const idx = Math.floor(Math.random() * copy.length);
      picked.push(copy.splice(idx, 1)[0]);
    }
    return picked;
  }
  
  // Generate random nonsense teaser text
  const teaserSentences = [
    "Experts are still baffled.",
    "More news to come soon.",
    "Citizens remain confused.",
    "Unbelievable events unfolding.",
    "Stay tuned for updates.",
    "This might change everything.",
    "Internet is buzzing with memes.",
    "Theories are pouring in.",
    "Nobody saw this coming.",
    "Social media is exploding.",
  ];
  
  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  // Render home articles
  function renderHomeArticles() {
    const container = document.getElementById("articlesContainer");
    container.innerHTML = "";
  
    const articles = pickRandomArticles(8);
    articles.forEach(headline => {
      const div = document.createElement("div");
      div.className = "article";
  
      const img = document.createElement("img");
      img.src = getImageForHeadline(headline);
      img.alt = headline;
      img.style.width = "150px";
      img.style.height = "100px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "10px";
  
      const contentDiv = document.createElement("div");
      const h2 = document.createElement("h2");
      h2.textContent = headline;
  
      const p = document.createElement("p");
      p.textContent = getRandom(teaserSentences);
  
      contentDiv.appendChild(h2);
      contentDiv.appendChild(p);
  
      div.appendChild(img);
      div.appendChild(contentDiv);
  
      // On click, go to article page with headline as param
      div.addEventListener("click", () => {
        const urlHeadline = encodeURIComponent(headline);
        window.location.href = `article.html?headline=${urlHeadline}`;
      });
  
      container.appendChild(div);
    });
  }
  
  // Wait for DOM
  window.addEventListener("DOMContentLoaded", () => {
    renderHomeArticles();
  });