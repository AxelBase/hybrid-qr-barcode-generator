<!-- src/routes/blog/posts/post3/+page.svelte -->
<script>
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Why Standard Scanners Fail on Hybrids | AxelBase Blog</title>
  <meta name="description" content="Explains why common scanning applications cannot properly read hybrid QR + barcode images and the security benefits this provides." />
  <meta property="og:title" content="Why Standard Scanners Fail on Hybrids | AxelBase Blog" />
  <meta property="og:description" content="Explains why common scanning applications cannot properly read hybrid QR + barcode images and the security benefits this provides." />
  <meta property="og:url" content="{base}/blog/posts/post3" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Why Standard Scanners Fail on Hybrids</p>
  </div>

  <article class="prose">
    <h1>Why Standard Scanners Fail on Hybrids</h1>
   
    <p class="post-meta">Published: December 12, 2025</p>
   
    <p>Standard scanning applications are designed to detect and decode individual code types independently. When presented with a hybrid image containing both a QR code and linear barcode, these applications typically process only one component, resulting in incomplete or meaningless data. This behavior is not a limitation but a deliberate security feature of hybrid authentication.</p>
   
    <p>The hybrid image structure places the QR code above the linear barcode with a deliberate gap, creating a single visual entity that appears unified to the human eye but contains two distinct data regions. Most scanning apps prioritize QR codes due to their higher data capacity and will ignore the linear barcode entirely, or vice versa depending on their detection algorithm.</p>
   
    <p>Even when both codes are detected, standard applications lack the logic to combine their contents or recognize that they form a single encrypted payload. The data in each part is ciphertext from AES-128 encryption, appearing as random characters without proper decryption.</p>
   
    <p>This multi-layer protection means that casual scanning with phone cameras or generic apps yields no useful information. The partial data obtained appears as gibberish, providing no clue about the original text or the need for specialized processing.</p>
   
    <p>The encryption process uses dynamic keys unique to each generation, making pattern recognition attacks ineffective. Even if an attacker captures multiple hybrid images, the changing encryption parameters prevent meaningful analysis of the ciphertext patterns.</p>
   
    <p>Complexity levels affect scanning resilience but not the fundamental failure mode of standard applications. Higher complexity increases error correction, allowing the official scanner to succeed under poor conditions while standard apps still fail to understand the combined nature of the data.</p>
   
    <p>This design philosophy ensures that possession of the physical or digital image alone is insufficient for authentication. Only devices with the official AxelBase scanner can properly interpret both components, reconstruct the dynamic key, and decrypt the original text.</p>
   
    <p>The failure of standard scanners is the primary security benefit of hybrid images, creating a clear distinction between authorized and unauthorized reading attempts.</p>
   
    <p class="italic-note">Security through deliberate incompatibility with common tools.</p>
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

  .prose p {
    color: var(--color-text-main);
    margin-bottom: 1.2rem;
  }

  .prose .italic-note {
    font-style: italic;
    color: var(--color-text-muted);
    text-align: center;
    margin-top: 3rem;
    font-size: 1.1rem;
  }
</style>