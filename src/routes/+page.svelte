<script>
  import { base } from '$app/paths';
  import FileUpload from '../components/FileUpload.svelte';
  import { generateHybrid, generateBatch } from '$lib/HybridGenerator';
  import { parseFile } from '$lib/FileParser';

  let input = '';
  let complexity = 'medium';
  let file = null;
  let secrets = [];
  let warnings = [];
  let headers = [];
  let validCount = 0;
  let selectedColumn = '';
  let previews = [];
  let allImages = [];
  let loading = false;
  let error = '';
  let fileType = '';

  $: canGenerate = (input.trim().length >= 4) || (secrets.length > 0);

  async function handleFile(event) {
    const { file: f } = event.detail;
    file = f;
    fileType = file ? file.name.split('.').pop().toLowerCase() : '';
    warnings = []; secrets = []; validCount = 0; previews = []; allImages = []; error = ''; selectedColumn = ''; headers = [];

    if (!file) return;

    try {
      let result;
      if (fileType === 'csv') {
        const tempResult = await parseFile(file, { column: null });
        headers = tempResult.headers || [];
        if (headers.length === 0) {
          warnings.push('No headers found in CSV');
          return;
        }
        result = await parseFile(file, { column: null });
        selectedColumn = result.selectedColumn || headers[0];
      } else {
        result = await parseFile(file);
      }
      secrets = result.secrets || [];
      warnings = result.warnings || [];
      validCount = result.validCount || secrets.length;
    } catch (err) {
      error = 'Failed to process file: ' + err.message;
    }
  }

  async function onColumnChange() {
    if (!file || fileType !== 'csv' || !selectedColumn) return;
    loading = true;
    try {
      const result = await parseFile(file, { column: selectedColumn });
      secrets = result.secrets;
      warnings = result.warnings;
      validCount = result.validCount;
    } catch (err) {
      warnings = ['Failed to re-parse with new column'];
    } finally {
      loading = false;
    }
  }

  async function generate() {
    if (!canGenerate) return;
    loading = true; error = ''; previews = []; allImages = [];

    try {
      if (secrets.length > 0) {
        allImages = await generateBatch(secrets, complexity);
      } else {
        allImages = [await generateHybrid(input.trim(), complexity)];
      }
      previews = allImages.slice(0, 10);
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function downloadAll() {
    if (allImages.length === 0) return;
    const zip = new JSZip();
    allImages.forEach((url, i) => {
      const b64 = url.split(',')[1];
      zip.file(`hybrid_${String(i + 1).padStart(4, '0')}.png`, b64, { base64: true });
    });
    zip.generateAsync({ type: 'blob' }).then(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `axelbase_hybrids_${new Date().toISOString().slice(0,10)}.zip`;
      a.click();
    });
  }
</script>

<svelte:head>
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="bingbot" content="index, follow" />
  <meta name="yandex" content="index, follow" />
  <meta name="description" content="Free, privacy-first hybrid QR + barcode generator with AES-128 encryption and dynamic keys." />
  <meta property="og:title" content="AxelBase Hybrid QR + Barcode Generator" />
  <meta property="og:description" content="Maximum-security hybrid images that standard scanners cannot read. Perfect for authentication, ticketing, and product verification." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{base}/" />
  <meta property="og:image" content="{base}/og-image.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="AxelBase Hybrid QR + Barcode Generator" />
  <meta name="twitter:description" content="Maximum-security hybrid images that standard scanners cannot read." />
  <meta name="twitter:image" content="{base}/og-image.jpg" />
</svelte:head>

<div class="container py-4">
  <div class="row justify-content-center">
    <div class="col-lg-10 col-xl-9">

      <section id="home" class="mb-5" in:fade={{ duration: 800 }}>
        <div class="text-center mb-5">
            <h1 class="display-4 fw-bold text-gradient mb-3">AxelBase Hybrid Generator</h1>
            <p class="lead" style="color: var(--color-text-muted);">
            Maximum-security hybrid QR + barcode images. Standard scanners see only useless fragments.
            </p>
        </div>

        <div class="glass-card p-4 p-md-5" in:fly={{ y: 50, duration: 800, delay: 200 }}>
          <div class="mb-4">
            <label for="complexity-select" class="form-label fw-bold text-uppercase small" style="color: var(--color-text-muted);">Complexity Level</label>
            <select id="complexity-select" bind:value={complexity} class="form-select form-select-lg">
              <option value="low">Low – Fastest</option>
              <option value="medium" selected>Medium – Balanced</option>
              <option value="high">High – Most Resilient</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="secret-input" class="form-label fw-bold text-uppercase small" style="color: var(--color-text-muted);">Enter Text (Single)</label>
            <textarea
              id="secret-input"
              bind:value={input}
              rows="3"
              class="form-control"
              placeholder="Type your secret here (min 4 characters)..."
              disabled={!!file}
            ></textarea>
          </div>

          <FileUpload on:fileChange={handleFile} on:remove={() => { file = null; secrets = []; headers = []; }} />

          {#if headers.length > 0 && fileType === 'csv'}
            <div class="mt-4 p-3 rounded-4 border" style="background: rgba(255,255,255,0.05);">
              <label for="column-select" class="form-label fw-bold">Select Column</label>
              <select id="column-select" bind:value={selectedColumn} on:change={onColumnChange} class="form-select">
                {#each headers as header}
                  <option value={header}>{header}</option>
                {/each}
              </select>
            </div>
          {/if}

          {#if warnings.length > 0}
            <div class="alert alert-warning mt-4 rounded-4 shadow-sm">{warnings.join(' • ')}</div>
          {/if}
          {#if error}
            <div class="alert alert-danger mt-4 rounded-4 shadow-sm">{error}</div>
          {/if}

          <button
            on:click={generate}
            disabled={loading || !canGenerate}
            class="btn btn-primary btn-lg w-100 mt-4 py-3 shadow-lg"
          >
            {#if loading}
              <span class="spinner-border spinner-border-sm me-2"></span> Processing...
            {:else}
              <i class="bi bi-qr-code-scan me-2"></i> Generate Hybrid{secrets.length > 1 ? 's' : ''} ({validCount || 1})
            {/if}
          </button>
        </div>

        {#if previews.length > 0}
          <div class="mt-5" in:fly={{ y: 20, duration: 600 }}>
            <h3 class="text-center mb-4 text-gradient">Preview Results</h3>
            <div class="row g-4">
              {#each previews as src, i}
                <div class="col-6 col-md-4 col-lg-3 text-center">
                  <div class="glass p-2 rounded-4 h-100">
                    <img {src} alt="" class="img-fluid rounded-3 mb-2" />
                    <small class="d-block fw-bold" style="color: var(--color-text-muted);">#{i + 1}</small>
                  </div>
                </div>
              {/each}
            </div>
            <div class="text-center mt-5">
              {#if allImages.length === 1}
                <a href={previews[0]} download="axelbase_hybrid.png" class="btn btn-success btn-lg px-5 shadow-lg">
                    <i class="bi bi-download me-2"></i> Download Image
                </a>
              {:else}
                <button on:click={downloadAll} class="btn btn-success btn-lg px-5 shadow-lg">
                    <i class="bi bi-file-earmark-zip me-2"></i> Download ZIP ({allImages.length})
                </button>
              {/if}
            </div>
          </div>
        {/if}
      </section>

<!-- src/routes/+page.svelte – About, How to Use, FAQ Sections (550–600 words each) -->
<script>
  import { base } from '$app/paths';
</script>

<!-- ABOUT SECTION -->
<section id="about" class="py-5 scroll-margin-offset">
  <div class="glass-card p-5">
    <h2 class="mb-4 text-gradient">About AxelBase</h2>

    <p>AxelBase is a privacy-first, client-side web utility that generates secure hybrid QR + linear barcode images for maximum authentication strength. Unlike traditional QR codes or barcodes that can be read by any standard scanner, AxelBase hybrid images protect sensitive data through a combination of strong encryption and deliberate visual obfuscation.</p>

    <p>The core innovation lies in splitting the text information into two parts. The first part, along with a timestamp and initialization vector, is encoded into the QR code. The second part is encoded into the linear barcode. Each image is encrypted using AES-128 with a dynamically generated key that is unique for every generation. This dynamic key is constructed from split components across the application and a timestamp, ensuring no two images ever share the same encryption parameters.</p>

    <p>Standard scanning applications fail to interpret hybrid images because they lack the logic to combine both components and reconstruct the dynamic key. Even if someone captures the full image, the ciphertext appears as random characters without the official AxelBase scanner. This makes unauthorized reading practically impossible while maintaining ease of use for authorized parties.</p>

    <p>The generator supports single text inputs and batch generation from CSV, TXT, or JSON files. Users can choose between three complexity levels — low, medium, and high — to balance generation speed with scan resilience. Higher complexity increases error correction, allowing successful scanning even when images are partially damaged or poorly printed.</p>

    <p>All processing occurs entirely in the browser, ensuring complete data privacy. No text, files, or generated images are ever transmitted to servers. This client-side approach eliminates server-side risks and makes the tool suitable for sensitive applications such as product authentication, secure ticketing, access control, and document verification.</p>

    <p>AxelBase was created to address the limitations of traditional visual codes while maintaining compatibility with existing printing and imaging infrastructure. By combining cryptographic strength, dynamic keys, and data splitting, it provides a powerful new layer of security for real-world authentication needs.</p>

    <p>The tool is open-source and free to use, with no tracking, no analytics, and no data collection. It represents a commitment to privacy, security, and usability in an increasingly connected world.</p>

    <p class="italic-note"><strong>Security that works for you — not against you.</strong></p>
  </div>
</section>

<!-- HOW TO USE SECTION -->
<section id="how-to" class="py-5 scroll-margin-offset">
  <div class="glass-card p-5">
    <h2 class="mb-4 text-gradient">How to Use the AxelBase Hybrid Generator</h2>

    <p>The AxelBase Hybrid Generator is designed to be simple and powerful. Follow these steps to create secure hybrid QR + barcode images.</p>

    <h3>1. Choose Your Mode</h3>
    <p><strong>Single Text Mode</strong> — Enter your text directly into the main input box. This is ideal for quick generation of individual hybrids.</p>
    <p><strong>Batch Mode</strong> — Upload a file containing multiple texts. Supported formats include CSV (with column selection), TXT (one secret per line), and JSON (array or object values).</p>

    <h3>2. Select Complexity Level</h3>
    <p>Choose between three levels:</p>
    <ul>
      <li><strong>Low</strong> — Fastest generation, minimal error correction. Best for digital use or perfect printing conditions.</li>
      <li><strong>Medium</strong> — Balanced performance and resilience. Recommended for most applications.</li>
      <li><strong>High</strong> — Maximum error correction and scan reliability. Ideal for physical labels that may experience wear or poor scanning conditions.</li>
    </ul>

    <h3>3. Upload or Enter</h3>
    <p>For single mode, simply type your text (minimum 4 characters). For batch mode, upload your file and select the correct column if using CSV. The system automatically detects the best column but allows manual override.</p>

    <h3>4. Generate & Review</h3>
    <p>Click the Generate button. The tool will create one or multiple hybrid images, showing previews of the first 10. Review the images to ensure they look correct.</p>

    <h3>5. Download Results</h3>
    <p>Single images can be downloaded as PNG. Batch generations are packaged as a ZIP file containing all hybrids with padded filenames (e.g., hybrid_0001.png).</p>

    <h3>Tips for Best Results</h3>
    <ul>
      <li>Use texts of at least 4 characters for security.</li>
      <li>Choose high complexity for physical use cases.</li>
      <li>Review warnings after file upload to catch any skipped entries.</li>
      <li>Always test generated images with the official AxelBase scanner.</li>
    </ul>

    <p class="italic-note">Secure, fast, and private — generate hybrids in seconds.</p>
  </div>
</section>

<!-- FAQ SECTION -->
<section id="faq" class="py-5 mb-5 scroll-margin-offset">
  <div class="glass-card p-5">
    <h2 class="mb-4 text-gradient">Frequently Asked Questions</h2>

    <div class="mb-4">
      <h5 class="fw-bold">Is the AxelBase Hybrid Generator free?</h5>
      <p>Yes, the tool is completely free to use with no limits or registration required. It is open-source and available for both personal and commercial use.</p>
    </div>

    <div class="mb-4">
      <h5 class="fw-bold">Do you store any of my text or generated images?</h5>
      <p>No. All processing happens entirely in your browser. No data is ever sent to servers, and nothing is stored after you close the page.</p>
    </div>

    <div class="mb-4">
      <h5 class="fw-bold">How secure are the hybrid images?</h5>
      <p>Extremely secure. Each image uses AES-128 encryption with a unique key generated per use. The text is split and encrypted, making unauthorized reconstruction impossible without the official scanner.</p>
    </div>

    <div class="mb-4">
      <h5 class="fw-bold">Can standard QR or barcode scanners read hybrids?</h5>
      <p>Standard scanners will only read partial or meaningless data. Only the official AxelBase scanner can properly combine and decrypt the encrypted payload.</p>
    </div>

    <div class="mb-4">
      <h5 class="fw-bold">What file formats are supported for batch generation?</h5>
      <p>CSV, TXT, and JSON files are all supported. CSV files allow column selection, TXT uses one text per line, and JSON extracts string values automatically.</p>
    </div>

    <div class="mb-4">
      <h5 class="fw-bold">How do I choose the right complexity level?</h5>
      <p>Use Low for digital use or perfect printing. Medium for general use. High for physical labels that may experience wear or poor scanning conditions.</p>
    </div>

    <div class="mb-4">
      <h5 class="fw-bold">Is the tool compatible with mobile devices?</h5>
      <p>Yes, the generator is fully responsive and works on phones, tablets, and desktops. File upload works on mobile browsers that support the File API.</p>
    </div>

    <div class="mb-4">
      <h5 class="fw-bold">Can I use hybrids for commercial products?</h5>
      <p>Yes, the tool is free for both personal and commercial use. You own the generated images and can use them in any lawful way.</p>
    </div>

    <div class="mb-4">
      <h5 class="fw-bold">What if my file upload fails or shows warnings?</h5>
      <p>Warnings appear if entries are too short or invalid. The system skips them automatically. Ensure your texts are at least 4 characters long.</p>
    </div>

    <div class="mb-0">
      <h5 class="fw-bold">Is the source code open?</h5>
      <p>Yes, the entire project is open-source. You can review the code for transparency and security.</p>
    </div>
  </div>
</section>
    </div>
  </div>
</div>

<style>
    .scroll-margin-offset {
        scroll-margin-top: 120px;
    }
</style>