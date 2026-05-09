(async () => {
  try {
    // GitHub repository details
    const repo = 'ajehrg26/secret.js';
    const branch = 'main';
    const filePath = 'filter.js';

    // Fetch latest commit SHA
    const res = await fetch(`https://api.github.com/repos/${repo}/commits/${branch}`);

    if (!res.ok) {
      throw new Error('Repository or branch not found');
    }

    const data = await res.json();
    const sha = data.sha;

    // CDN URL using latest commit
    const url = `https://cdn.jsdelivr.net/gh/${repo}@${sha}/${filePath}`;

    console.log('Fetching latest filter.js from:', url);

    // Prevent duplicate loading
    if (document.querySelector(`script[data-loader="${repo}"]`)) {
      console.log('⚠️ filter.js is already loaded on this page.');
      return;
    }

    // Create script element
    const s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.dataset.loader = repo;

    // Success callback
    s.onload = () => {
      console.log(`✅ filter.js loaded successfully | Commit: ${sha.substring(0, 7)}`);
    };

    // Error callback
    s.onerror = () => {
      console.error('❌ Failed to load filter.js from jsDelivr CDN');
    };

    // Inject script
    document.head.appendChild(s);

  } catch (e) {
    console.error('🚨 Loader Error:', e);
  }
})();
