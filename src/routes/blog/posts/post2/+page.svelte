<!-- src/routes/blog/posts/post2/+page.svelte -->
<script>
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>The Encryption Behind Hybrid Images | AxelBase Blog</title>
  <meta name="description" content="Deep dive into AES-128 encryption and dynamic key generation that secures every hybrid QR + barcode image." />
  <meta property="og:title" content="The Encryption Behind Hybrid Images | AxelBase Blog" />
  <meta property="og:description" content="Deep dive into AES-128 encryption and dynamic key generation that secures every hybrid QR + barcode image." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>The Encryption Behind Hybrid Images</p>
  </div>

  <article class="prose">
    <h1>The Encryption Behind Hybrid Images</h1>
   
    <p class="post-meta">Published: December 12, 2025</p>
   
    <p>At the heart of hybrid QR and barcode security lies AES-128 encryption with dynamic key generation. This cryptographic approach ensures that even if both parts of a hybrid image are captured, the original text remains protected without the specific decryption logic.</p>
   
    <p>When a text is processed, it first undergoes AES-128 encryption using a key that is unique to each generation. The key is constructed from multiple components distributed across the application and supplemented with a timestamp-based element that changes every millisecond. This dynamic construction means no two hybrid images ever share the same encryption key.</p>
   
    <p>A random initialization vector is generated for each encryption operation, adding another layer of uniqueness. The encrypted ciphertext is then split into two portions: the first half, along with the initialization vector, is encoded in the QR code, while the second half is placed in the linear barcode. This splitting strategy ensures that neither component contains sufficient information for decryption on its own.</p>
   
    <p>The use of AES-128 provides proven cryptographic strength while maintaining performance suitable for client-side generation. The algorithm's block cipher nature works effectively with the variable-length texts typically used in authentication scenarios.</p>
   
    <p>Complexity levels influence not only visual appearance but also resilience. Higher complexity increases error correction in the QR code, allowing successful scanning even when the image is partially obscured or damaged, while maintaining the same encryption strength across all levels.</p>
   
    <p>Batch generation applies this encryption process to thousands of texts simultaneously, with each resulting hybrid image having its own unique key and initialization vector. This per-image uniqueness prevents patterns that could be exploited in large-scale deployments.</p>
   
    <p>The encryption process occurs entirely in the browser, ensuring that texts never leave the user's device. This client-side approach eliminates server-side storage risks and maintains privacy throughout the generation process.</p>
   
    <p>Understanding this encryption model reveals why hybrid images offer superior security compared to traditional codes. The combination of strong cryptography, dynamic keys, and data splitting creates multiple independent barriers that must all be overcome for successful unauthorized access.</p>
   
    <p class="italic-note">True security comes from multiple layers working together seamlessly.</p>
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