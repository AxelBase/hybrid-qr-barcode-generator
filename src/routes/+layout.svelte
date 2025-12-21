<script>
  import '../app.css';
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';

  // --- PayPal / Buy Me A Coffee Logic ---
  const paypalUsername = 'AxelLab427'; 
  const donationAmounts = [1, 3, 5, 10];
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  // --- Click Outside Directive ---
  function clickOutside(node) {
    const handleClick = (event) => {
      if (node && !node.contains(event.target)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  // --- Theme Toggle Logic ---
  function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-bs-theme');
    body.setAttribute('data-bs-theme', current === 'dark' ? 'light' : 'dark');
  }
</script>

<header class="fixed-top p-3 w-100" style="pointer-events: none; z-index: 1040;">
  <nav class="container glass rounded-pill px-4 py-2 d-flex justify-content-between align-items-center shadow-sm"
       style="pointer-events: auto; max-width: 1200px;">
    
    <div class="d-flex align-items-center gap-3">
      <a href="{base}/" class="d-flex align-items-center gap-2 text-decoration-none logo-group">
        <img src="{base}/AxelLab-Logo.ico" alt="Logo" class="navbar-brand-logo" />
        <span class="fw-bold fs-5 d-none d-sm-inline" style="color: var(--color-text-main);">AxelBase</span>
      </a>

      <div class="position-relative ms-2" use:clickOutside on:click_outside={closeDropdown}>
        <button class="bmac-button" on:click={toggleDropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z" />
            </svg>
            <span class="d-none d-md-inline">Coffee</span>
        </button>

        {#if isDropdownOpen}
          <div class="bmac-dropdown glass" transition:fly={{ y: -10, duration: 250 }}>
            {#each donationAmounts as amount}
              <a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" rel="noopener noreferrer" on:click={closeDropdown}>
                ${amount}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <div class="d-flex align-items-center gap-2">
      <ul class="d-none d-lg-flex align-items-center gap-1 m-0 list-unstyled">
        <li><a class="nav-link-custom" href="{base}/">Home</a></li>
        <li><a class="nav-link-custom" href="{base}/#about">About</a></li>
        <li><a class="nav-link-custom" href="{base}/#how-to">How to</a></li>
        <li><a class="nav-link-custom" href="{base}/#faq">FAQ</a></li>
        <li><a class="nav-link-custom" href="{base}/blog">Blog</a></li>
      </ul>

      <button 
        class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center border-0" 
        style="width: 40px; height: 40px; background: rgba(128,128,128,0.1);"
        on:click={toggleTheme}
        aria-label="Toggle Theme"
      >
        <i class="bi bi-circle-half fs-5" style="color: var(--color-text-main);"></i>
      </button>
    </div>
  </nav>
</header>

<main style="margin-top: 100px;"> <slot />
</main>

<footer class="custom-footer">
  <div class="container text-center d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
    <span>&copy; AxelBase Hybrid QR – {new Date().getFullYear()}</span>
    <div>
      <a href="{base}/privacy" class="footer-link">Privacy</a>
      <span style="opacity: 0.3;">|</span>
      <a href="{base}/terms" class="footer-link">Terms</a>
    </div>
  </div>
</footer>

<style>
  /* Logo Animation */
  .navbar-brand-logo { height: 32px; width: auto; transition: transform 0.3s; }
  .logo-group:hover .navbar-brand-logo { transform: rotate(10deg) scale(1.1); }

  /* Nav Link Styling */
  .nav-link-custom {
    color: var(--color-text-main);
    text-decoration: none;
    padding: 0.5rem 1rem;
    font-weight: 600;
    transition: color 0.3s;
    font-size: 0.9rem;
    position: relative;
  }
  .nav-link-custom::after {
    content: ''; position: absolute; width: 0; height: 2px; bottom: 5px; left: 50%;
    background-color: var(--color-accent); transition: all 0.3s ease; transform: translateX(-50%);
  }
  .nav-link-custom:hover { color: var(--color-accent); }
  .nav-link-custom:hover::after { width: 60%; }

  /* Coffee Button */
  .bmac-button {
    background: linear-gradient(45deg, #FFDD00, #FBB03B);
    color: #231A24;
    border: none;
    border-radius: 50px;
    padding: 6px 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .bmac-button svg { width: 16px; height: 16px; animation: steam 3s infinite ease-out; }
  .bmac-button:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(251, 176, 59, 0.4); }

  .bmac-dropdown {
    position: absolute; top: 120%; left: 50%; transform: translateX(-50%);
    min-width: 100px; padding: 5px; border-radius: 12px;
    display: flex; flex-direction: column; z-index: 1100;
  }
  .bmac-dropdown a {
    padding: 8px; text-align: center; text-decoration: none; color: var(--color-text-main);
    font-weight: 600; border-radius: 8px; transition: background 0.2s;
  }
  .bmac-dropdown a:hover { background: rgba(0,0,0,0.05); color: var(--color-accent); }

  @keyframes steam { 0% { opacity: 0.8; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-3px); } }
</style>