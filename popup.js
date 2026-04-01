const clearBtn = document.getElementById('clearBtn');
const btnLabel = document.querySelector('.btn-label');
const urlText = document.getElementById('urlText');
const urlDot = document.getElementById('urlDot');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

let currentTabId = null;
let isShopify = false;

// Show current tab URL
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  currentTabId = tab.id;
  const url = tab.url || '';

  try {
    const hostname = new URL(url).hostname;
    urlText.textContent = hostname;

    if (hostname.includes('myshopify.com') || url.includes('/cart')) {
      isShopify = true;
      urlDot.classList.remove('inactive');
    } else {
      isShopify = false;
      urlDot.classList.add('inactive');
      urlText.classList.add('warning');
      showToast('warn', 'May not be a Shopify store');
    }
  } catch {
    urlText.textContent = 'Invalid URL';
    urlDot.classList.add('inactive');
    clearBtn.disabled = true;
  }
});

// Clear cart
clearBtn.addEventListener('click', () => {
  setLoading(true);
  hideToast();

  chrome.scripting.executeScript(
    {
      target: { tabId: currentTabId },
      func: () => {
        return fetch('/cart/clear.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return { success: true };
          })
          .catch(err => ({ success: false, error: err.message }));
      }
    },
    (results) => {
      if (chrome.runtime.lastError) {
        setLoading(false);
        showToast('error', 'Cannot access this page');
        return;
      }

      const result = results?.[0]?.result;

      if (result?.success) {
        setSuccess();
        showToast('success', 'Cart cleared! Reloading...');

        // Reload the tab after short delay
        setTimeout(() => {
          chrome.tabs.reload(currentTabId);
          setTimeout(() => {
            setLoading(false);
            clearBtn.classList.remove('success');
            btnLabel.textContent = 'Clear Cart';
          }, 1500);
        }, 800);
      } else {
        setLoading(false);
        showToast('error', result?.error || 'Failed to clear cart');
      }
    }
  );
});

function setLoading(on) {
  clearBtn.disabled = on;
  if (on) {
    clearBtn.classList.add('loading');
    clearBtn.classList.remove('success');
    btnLabel.textContent = 'Clearing...';
  } else {
    clearBtn.classList.remove('loading');
    btnLabel.textContent = 'Clear Cart';
  }
}

function setSuccess() {
  clearBtn.classList.remove('loading');
  clearBtn.classList.add('success');
  clearBtn.disabled = true;
  btnLabel.textContent = 'Cleared ✓';
}

function showToast(type, msg) {
  toast.className = `toast toast-${type} show`;
  toastMsg.textContent = msg;
}

function hideToast() {
  toast.classList.remove('show');
}
