document.addEventListener('DOMContentLoaded', () => {
  const highlightList = document.getElementById('highlightList');
  const clearBtn = document.getElementById('clearBtn');
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // لود کردن تم ذخیره‌شده
  chrome.storage.sync.get(['theme'], (result) => {
    const savedTheme = result.theme || 'light';
    body.className = savedTheme;
    themeToggle.textContent = savedTheme === 'light' ? 'Dark Mode' : 'Light Mode';
  });

  // لود کردن هایلایت‌های ذخیره‌شده
  chrome.storage.sync.get(['highlights'], (result) => {
    const highlights = result.highlights || [];
    highlights.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      highlightList.appendChild(li);
    });
  });

  
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.className === 'light' ? 'dark' : 'light';
    body.className = currentTheme;
    themeToggle.textContent = currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';

   
    chrome.storage.sync.set({ theme: currentTheme });
  });

  
  clearBtn.addEventListener('click', () => {
    chrome.storage.sync.set({ highlights: [] }, () => {
      highlightList.innerHTML = '';
    });
  });
});