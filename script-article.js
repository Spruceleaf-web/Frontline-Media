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

// Utility to get URL param
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Get random number between min and max inclusive
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate paragraph with 2-5 sentences from global sentencePool
function generateParagraph() {
  const count = randomInt(3, 5);
  const maxStart = window.sentencePool.length - count;
  const startIdx = randomInt(0, maxStart);
  return window.sentencePool.slice(startIdx, startIdx + count).join(" ");
}

// Generate 2-3 paragraphs
function generateArticleBody() {
  const paraCount = randomInt(2, 3);
  let paras = [];
  for (let i = 0; i < paraCount; i++) {
    paras.push(`<p>${generateParagraph()}</p>`);
  }
  return paras.join("\n");
}

// Main
window.addEventListener("DOMContentLoaded", () => {
  const headline = getQueryParam("headline");
  const articleTitle = document.getElementById("articleTitle");
  const articleImage = document.getElementById("articleImage");
  const articleQuote = document.getElementById("articleQuote");
  const articleContent = document.getElementById("articleContent");

  if (!headline) {
    articleTitle.textContent = "Article Not Found";
    articleImage.style.display = "none";
    articleQuote.textContent = "";
    articleContent.innerHTML = "<p>Sorry, we couldn't find the article you were looking for.</p>";
    return;
  }

  // Decode headline for display
  const decodedHeadline = decodeURIComponent(headline);
  articleTitle.textContent = decodedHeadline;

  // Pick a random quote from a fixed list
  const quoteList = [
    '"I never thought I’d see the day," said one anonymous source.',
    '"This changes everything," exclaimed a local enthusiast.',
    '"Can’t believe this is real, but it probably is," tweeted a popular influencer.',
    '"If true, this could rewrite history," commented a well-known scientist.',
    '"I’m just here for the memes," joked an internet user.',
    '"This is peak 2025," said a bewildered citizen.',
    '"More updates as the story develops," promised the news team.',
  ];
  articleQuote.textContent = quoteList[Math.floor(Math.random() * quoteList.length)];

  // Set image using keyword system
  articleImage.src = getImageForHeadline(decodedHeadline);
  articleImage.alt = decodedHeadline;

  // Generate article nonsense body using global sentence pool
  articleContent.innerHTML = generateArticleBody();
});