<!-- src/routes/blog/posts/post6/+page.svelte -->
<script>
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>File Upload Best Practices | AxelBase Blog</title>
  <meta name="description" content="Essential tips for preparing CSV, TXT, and JSON files to ensure smooth batch generation of hybrid images." />
  <meta property="og:title" content="File Upload Best Practices | AxelBase Blog" />
  <meta property="og:description" content="Essential tips for preparing CSV, TXT, and JSON files to ensure smooth batch generation of hybrid images." />
  <meta property="og:url" content="{base}/blog/posts/post6" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>File Upload Best Practices</p>
  </div>

  <article class="prose">
    <h1>File Upload Best Practices</h1>
   
    <p class="post-meta">Published: December 12, 2025</p>
   
    <p>Successful batch generation of hybrid images depends on properly prepared input files. Following best practices ensures smooth processing and maximizes the number of valid texts generated from your data.</p>
   
    <p>CSV files offer the most flexibility with column selection. Include a clear header row with descriptive column names. The text data should be placed in a dedicated column with a recognizable name such as text, token, password, or detail. This enables automatic detection while still allowing manual selection when needed.</p>
   
    <p>Keep text values at least four characters long to meet minimum requirements. Shorter entries will be skipped automatically with clear warnings provided. Remove or separate any identifier columns like ID numbers that contain only short numeric values to avoid confusion during processing.</p>
   
    <p>Ensure consistent formatting across rows. Mixed data types in the same column can cause parsing issues. All text entries should be string values without embedded quotes or special characters that might interfere with processing.</p>
   
    <p>TXT files require one text per line with no additional formatting. This simple structure processes quickly and reliably. Avoid empty lines or lines containing only spaces, as these will be ignored during generation.</p>
   
    <p>JSON files should use either array format with direct string values or object format with string values in properties. The system extracts all valid string entries automatically. Nested structures or non-string values are ignored during processing.</p>
   
    <p>File size considerations become important for very large batches. While the generator supports up to 100MB files, extremely large datasets may impact browser performance. Consider splitting very large collections into multiple files when possible.</p>
   
    <p>Always review warnings after upload. The system provides detailed feedback about skipped entries or column selection issues. These messages help identify and resolve data problems before final generation.</p>
   
    <p>Proper file preparation significantly reduces processing time and ensures maximum yield of valid hybrid images from your source data.</p>
   
    <p class="italic-note">Clean data leads to secure, efficient hybrid generation.</p>
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