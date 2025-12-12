<!-- src/routes/+error.svelte – 404 Error Page -->
<script>
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>404 Not Found | AxelBase Hybrid Generator</title>
  <meta name="description" content="The page you are looking for could not be found on the AxelBase Hybrid Generator." />
  <meta property="og:title" content="404 Not Found | AxelBase Hybrid Generator" />
  <meta property="og:description" content="The page you are looking for could not be found on the AxelBase Hybrid Generator." />
  <meta property="og:url" content="{base}/404" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>404 Not Found</p>
  </div>

  <article class="prose">
    <h1>404 — Page Not Found</h1>

    <p class="post-meta">Last Updated: December 12, 2025</p>

    <p>Sorry — the page you requested does not exist or has been moved. This might happen if you followed an outdated link or typed the address incorrectly. Don't worry — the main generator tool is still available and fully functional.</p>

    <h2>Quick Navigation</h2>
    <ul>
      <li><a href="{base}/">Home – Hybrid Generator</a></li>
      <li><a href="{base}/blog">Blog – Insights & Guides</a></li>
      <li><a href="{base}/privacy">Privacy Policy</a></li>
      <li><a href="{base}/terms">Terms & Conditions</a></li>
    </ul>

    <h2>Need Help?</h2>
    <p>If you believe this page should exist or encountered an unexpected error, try refreshing the page or clearing your browser cache. All core functionality remains accessible from the home page.</p>

    <p>The AxelBase Hybrid Generator is a client-side tool that runs entirely in your browser — no server-side pages are required beyond what you see. This design ensures maximum privacy and security for your texts.</p>

    <p class="italic-note"><strong>Security never sleeps.</strong> Return to the generator and continue creating unbreakable hybrid images.</p>
  </article>
</div>

<style>
  .post-layout {
    max-width: 800px;
    margin: 0 auto;
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .breadcrumbs a {
    color: var(--color-accent);
    text-decoration: none;
  }

  .breadcrumbs a:hover {
    text-decoration: underline;
  }

  .breadcrumbs p {
    margin: 0;
    color: var(--color-text-main);
  }

  .prose {
    line-height: 1.8;
  }

  .prose .post-meta {
    color: var(--color-text-muted);
    font-size: 0.9rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--glass-border);
    padding-bottom: 1rem;
  }

  .prose h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: var(--color-accent);
    font-weight: 800;
  }

  .prose h2 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: var(--color-accent);
    font-weight: 700;
    border-bottom: 1px solid var(--glass-border);
    padding-bottom: 0.5rem;
  }

  .prose p {
    color: var(--color-text-main);
    margin-bottom: 1.2rem;
  }

  .prose ul {
    list-style-type: '→ ';
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .prose ul li {
    padding-left: 0.5rem;
    margin-bottom: 0.75rem;
    color: var(--color-text-main);
  }

  .prose ul li::marker {
    color: var(--color-highlight);
  }

  .prose .italic-note {
    font-style: italic;
    color: var(--color-text-muted);
    text-align: center;
    margin-top: 3rem;
    font-size: 1.1rem;
  }

  .prose a {
    color: var(--color-accent);
    text-decoration: underline;
  }

  .prose a:hover {
    opacity: 0.8;
  }
</style>