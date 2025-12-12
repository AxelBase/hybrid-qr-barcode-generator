<!-- src/routes/privacy/+page.svelte -->
<script>
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | AxelBase Hybrid Generator</title>
  <meta name="description" content="We collect no personal data. All processing happens in your browser for maximum privacy and security." />
  <meta property="og:title" content="Privacy Policy | AxelBase Hybrid Generator" />
  <meta property="og:description" content="We collect no personal data. All processing happens in your browser for maximum privacy and security." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>

    <p class="post-meta">Effective Date: December 12, 2025</p>

    <p>Welcome to the <strong>AxelBase Hybrid QR + Barcode Generator</strong>, a completely client-side web utility ("we," "us," or "our"). This Privacy Policy explains our commitment to your privacy. The tool generates secure hybrid images by combining QR codes and linear barcodes with AES-128 encryption and dynamic key generation. Because everything runs entirely in your browser, <strong>we do not collect, store, or transmit any personal data</strong>.</p>

    <h2>Information We Do Not Collect</h2>
    <p>The AxelBase Hybrid Generator operates on a strict <strong>zero-data-collection principle</strong>. We do not gather:</p>
    <ul>
      <li><strong>Personal Information</strong>: Names, email addresses, IP addresses, or any identifiers.</li>
      <li><strong>Usage Data</strong>: Browser details, device information, location, or analytics.</li>
      <li><strong>text Content</strong>: Any text you input or upload (single texts or files) is processed locally and never leaves your device.</li>
      <li><strong>Generated Images</strong>: Hybrid PNGs or ZIP files are created in your browser only.</li>
    </ul>
    <p>No cookies, tracking pixels, or third-party analytics are used. Your session is completely stateless.</p>

    <h2>How the Tool Works</h2>
    <p>All operations occur exclusively in your browser:</p>
    <ul>
      <li><strong>Input Processing</strong>: Text entry or file upload (CSV, TXT, JSON) is handled client-side using JavaScript libraries.</li>
      <li><strong>Encryption & Generation</strong>: AES-128 encryption, dynamic key creation, and canvas-based image merging happen locally.</li>
      <li><strong>File Handling</strong>: Uploaded files are read via FileReader API and discarded after use.</li>
      <li><strong>Downloads</strong>: PNG images and ZIP files are generated using browser-native features.</li>
    </ul>
    <p>No data is sent to servers. Temporary memory is cleared when you close or refresh the page.</p>

    <h2>Third-Party Services</h2>
    <p>We use only open-source libraries loaded via public CDNs (Bootstrap, QRCode.js, JsBarcode, PapaParse, JSZip, CryptoJS). These CDNs deliver static files and do not track users. No advertising, analytics, or data-sharing services are integrated.</p>

    <h2>Security & Data Protection</h2>
    <p>Since no data leaves your device, the primary security responsibility lies with your browser and device. We recommend using up-to-date browsers and avoiding public networks when handling sensitive texts.</p>

    <h2>Children's Privacy</h2>
    <p>The tool is not directed at children under 13. We do not knowingly collect information from children.</p>

    <h2>Changes to This Policy</h2>
    <p>We may update this policy. Changes will be posted here with a new effective date.</p>

    <h2>Contact</h2>
    <p>For questions about this Privacy Policy, open an issue on our public repository.</p>

    <p class="italic-note"><strong>Your privacy is absolute</strong> — no data collection, no tracking, no compromise.</p>
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