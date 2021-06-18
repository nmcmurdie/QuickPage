'use strict'
window.addEventListener("load", () => {
   chrome.storage.sync.get('darkMode', mode => {
      if (Object.keys(mode).length > 0 && mode.darkMode)
         document.getElementById("darkMode").click();
   });
});
document.getElementById("darkMode").addEventListener("change", evt => {
   if (evt.target.checked) document.body.classList.add('dark');
   else document.body.classList.remove('dark');
   chrome.storage.sync.set({darkMode: evt.target.checked})
});
