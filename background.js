chrome.contextMenus.create({
  id: "saveHighlight",
  title: "Save Highlight",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveHighlight") {
    const selectedText = info.selectionText;
    chrome.storage.sync.get(['highlights'], (result) => {
      const highlights = result.highlights || [];
      highlights.push(selectedText);
      chrome.storage.sync.set({ highlights });
    });
  }
});