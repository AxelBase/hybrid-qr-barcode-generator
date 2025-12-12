<!-- src/routes/blog/+page.svelte – Blog Index -->
<script>
  import { base } from '$app/paths';

  const posts = [
    { href: '/blog/posts/post1', title: 'Understanding Hybrid QR + Barcode Security', description: 'An introduction to how hybrid images provide stronger authentication than standard QR codes or barcodes alone.' },
    { href: '/blog/posts/post2', title: 'The Encryption Behind Hybrid Images', description: 'Deep dive into AES-128 encryption and dynamic key generation used in every hybrid image.' },
    { href: '/blog/posts/post3', title: 'Why Standard Scanners Fail on Hybrids', description: 'Explains why common apps only read partial or useless data from hybrid images.' },
    { href: '/blog/posts/post4', title: 'Batch Generation for Large-Scale Deployment', description: 'How to generate thousands of secure hybrids from CSV, TXT, or JSON files efficiently.' },
    { href: '/blog/posts/post5', title: 'Complexity Levels and Scan Resilience', description: 'Choosing Low, Medium, or High complexity for speed vs resistance to damage or poor scanning conditions.' },
    { href: '/blog/posts/post6', title: 'File Upload Best Practices', description: 'Tips for preparing CSV, TXT, and JSON files to avoid common parsing issues and maximize security.' },
    { href: '/blog/posts/post7', title: 'Real-World Use Cases for Hybrid Codes', description: 'Secure ticketing, product authentication, access control, and tamper-proof verification examples.' },
  ];
</script>

<svelte:head>
  <title>Blog | AxelBase Hybrid Insights</title>
  <meta name="description" content="Technical insights, guides, and best practices for the AxelBase Hybrid QR + Barcode Generator." />
</svelte:head>

<div class="container fade-in blog-index">
  <header class="blog-header">
    <h1>Blog: AxelBase Hybrid Insights</h1>
    <p class="subtitle">
      Technical articles, security explanations, and usage guides for the AxelBase Hybrid QR + Barcode Generator.
    </p>
  </header>

  <div class="posts-grid">
    {#each posts as post}
      <a href="{base}{post.href}" class="card post-card">
        <div class="card-body">
          <h2 class="post-title">{post.title}</h2>
          <p class="post-description">{post.description}</p>
          <span class="read-more">Read Article →</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-index {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 2rem;
  }

  .blog-header h1 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .post-card {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .post-card .card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .post-title {
    font-size: 1.25rem;
    color: var(--accent-secondary);
    margin-bottom: 0.75rem;
  }

  .post-description {
    color: var(--text-secondary);
    flex-grow: 1;
    margin-bottom: 1rem;
  }

  .read-more {
    color: var(--accent-primary);
    font-weight: 600;
    align-self: flex-start;
    transition: var(--transition-fast);
  }

  .post-card:hover .read-more {
    transform: translateX(5px);
  }
</style>