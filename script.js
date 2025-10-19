// Show current time in milliseconds
const timeEl = document.getElementById("userTime");
function updateTime() {
  timeEl.textContent = Date.now();
}
updateTime();

// Avatar controls: file upload only (no URL handling here)
const avatarImg = document.querySelector('[data-testid="test-user-avatar"]');
const avatarFileInput = document.getElementById("avatarFile");

let _currentAvatarObjectUrl = null;

if (avatarFileInput && avatarImg) {
  avatarFileInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    // Revoke previous object URL if present
    if (_currentAvatarObjectUrl) {
      try {
        URL.revokeObjectURL(_currentAvatarObjectUrl);
      } catch (err) {
        /* ignore */
      }
      _currentAvatarObjectUrl = null;
    }

    const objectUrl = URL.createObjectURL(file);
    _currentAvatarObjectUrl = objectUrl;
    avatarImg.src = objectUrl;
    avatarImg.alt = file.name || "Uploaded avatar";
  });
}
