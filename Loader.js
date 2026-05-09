(async () => {
  try {
    // Configuration for your specific repository
    const repo = 'ajehrg26/secret.js';
    const branch = 'main';
    const filePath = 'filter.js';

    // 1. Fetch the latest commit SHA to ensure fresh code delivery
    const res = await fetch(`https://api.github.com/repos/${repo}/commits/${branch}`);
    
    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} - Check if the repo/branch name is correct.`);
    }

    const data = await res.json();
    const sha = data.sha;

    // 2. Construct the jsDelivr URL using the specific commit SHA
    const url = `https://cdn.jsdelivr.net/gh/${repo}@${sha}/${filePath}`;
    console.log('🚀 Initializing filter.js loader...');
    console.log('Fetching:', url);

    // 3. Prevent duplicate injection
    if (document.querySelector(`script[data-loader="${repo}"]`)) {
      console.warn('⚠️ filter.js is already active on this page.');
      return;
    }

    // 4. Create and inject the script element
    const s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.dataset.loader = repo;

    s.onload = () => {
      console.log(`✅ filter.js loaded successfully.`);
      console.log(`Version (SHA): ${sha.substring(0, 7)}`);
    };

    s.onerror = () => {
      console.error('❌ Error: jsDelivr failed to serve the script.');
    };

    document.head.appendChild(s);

  } catch (e) {
    console.error('Loader encountered a critical error:', e.message);
  }
})();
