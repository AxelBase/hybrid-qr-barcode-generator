<!-- src/routes/terms/+page.svelte -->
<script>
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions | AxelBase Hybrid Generator</title>
  <meta name="description" content="Terms of use for the AxelBase Hybrid QR + Barcode Generator – free, open-source, client-side tool." />
  <meta property="og:title" content="Terms & Conditions | AxelBase Hybrid Generator" />
  <meta property="og:description" content="Terms of use for the AxelBase Hybrid QR + Barcode Generator – free, open-source, client-side tool." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Terms & Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms & Conditions</h1>

    <p class="post-meta">Effective Date: December 12, 2025</p>

    <p>By accessing or using the <strong>AxelBase Hybrid QR + Barcode Generator</strong> ("the Service"), you agree to be bound by these Terms & Conditions. This is a free, open-source, client-side web utility provided "as is" for generating secure hybrid authentication images.</p>

    <h2>1. Use of the Service</h2>
    <p>The Service is provided for lawful purposes only. You may use it to generate hybrid images for personal or commercial applications. You are responsible for the content you input and the images you create.</p>

    <h2>2. No Warranty</h2>
    <p>The Service is provided <strong>"as is"</strong> and <strong>"as available"</strong> without warranties of any kind, express or implied. We do not guarantee:</p>
    <ul>
      <li>Uninterrupted or error-free operation</li>
      <li>Compatibility with all browsers or devices</li>
      <li>Suitability for any particular purpose</li>
      <li>Security of generated images against all possible attacks</li>
    </ul>
    <p>While we implement strong encryption and security practices, no system is completely impenetrable.</p>

    <h2>3. Limitation of Liability</h2>
    <p>We shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from use of the Service, including but not limited to loss of data, security breaches, or failed authentication attempts.</p>

    <h2>4. Intellectual Property</h2>
    <p>The Service source code is open-source and available on GitHub. Generated hybrid images are owned by you. You may use them freely for any lawful purpose.</p>

    <h2>5. Prohibited Uses</h2>
    <p>You may not:</p>
    <ul>
      <li>Use the Service for illegal activities</li>
      <li>Attempt to reverse-engineer or interfere with the Service</li>
      <li>Distribute malicious content through generated images</li>
      <li>Overload or abuse the Service</li>
    </ul>

    <h2>6. Termination</h2>
    <p>We reserve the right to terminate or restrict access to the Service at any time without notice.</p>

    <h2>7. Changes to Terms</h2>
    <p>We may modify these terms at any time. Continued use constitutes acceptance of changes.</p>

    <h2>8. Governing Law</h2>
    <p>These terms are governed by applicable international laws.</p>

    <p class="italic-note">Use responsibly — security is a shared responsibility.</p>
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
</style>