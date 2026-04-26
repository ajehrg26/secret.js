(async () => {
  try {
    // Configuration for your specific repo
    const repo = 'ajehrg26/secret.js';
    const branch = 'main';
    const filePath = 'filter.js'; 

    // 1. Fetch the latest commit SHA from your repo to ensure fresh code
    const res = await fetch(`https://api.github.com/repos/${repo}/commits/${branch}`);
    
    if (!res.ok) throw new Error('Repository or branch not found');
    
    const data = await res.json();
    const sha = data.sha;

    // 2. Build the jsDelivr URL for filter.js
    const url = `https://cdn.jsdelivr.net/gh/${repo}@${sha}/${filePath}`;
    console.log('🚀 Loading:', url);

    // 3. Prevent duplicate injection
    if (document.querySelector(`script[data-loader="${repo}"]`)) {
      console.warn('⚠️ filter.js is already injected');
      return;
    }

    // 4. Create and append the script tag
    const s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.dataset.loader = repo;

    s.onload = () => console.log('✅ filter.js loaded successfully (SHA):', sha);
    s.onerror = () => console.error('❌ Failed to load filter.js');

    document.head.appendChild(s);

  } catch (e) {
    console.error('🛑 Loader error:', e);
  }
})();
