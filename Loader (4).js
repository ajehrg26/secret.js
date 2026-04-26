(async () => {
  try {
    const repo = 'ajehrg26/Access1.js';
    const branch = 'main';
    const filePath = 'Access1.js'; 

    // Get latest commit SHA to bypass caching
    const res = await fetch(`https://api.github.com/repos/${repo}/commits/${branch}`);
    
    if (!res.ok) throw new Error('Repository or branch not found');
    
    const data = await res.json();
    const sha = data.sha;

    const url = `https://cdn.jsdelivr.net/gh/${repo}@${sha}/${filePath}`;
    console.log('Loading:', url);

    // Prevent duplicate injection
    if (document.querySelector(`script[data-loader="${repo}"]`)) {
      console.log('⚠️ Access1.js already injected');
      return;
    }

    const s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.dataset.loader = repo;

    s.onload = () => console.log('✅ Access1.js loaded successfully (SHA):', sha.substring(0, 7));
    s.onerror = () => console.error('❌ Failed to load Access1.js from CDN');

    document.head.appendChild(s);

  } catch (e) {
    console.error('Loader error:', e);
  }
})();

