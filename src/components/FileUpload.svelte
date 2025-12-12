<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let fileInput;
  let file = null;
  let selectedColumn = '';
  let headers = [];

  function handleChange() {
    file = fileInput.files[0];
    if (file) {
      dispatch('fileChange', { file, selectedColumn, headers });
    }
  }

  function remove() {
    file = null;
    selectedColumn = '';
    headers = [];
    fileInput.value = '';
    dispatch('remove');
  }

  export function updateHeaders(newHeaders, autoSelected = '') {
    headers = newHeaders;
    selectedColumn = autoSelected || newHeaders[0] || '';
    dispatch('fileChange', { file, selectedColumn, headers });
  }
</script>

<div class="mb-4">
  <label for="file-upload" class="form-label fw-bold text-uppercase small" style="color: var(--color-text-muted);">
    Upload File (.csv, .txt, .json)
  </label>
  
  <div class="upload-area p-1 rounded-4 border-2 border-dashed position-relative overflow-hidden">
    <input
      id="file-upload"
      type="file"
      accept=".csv,.txt,.json"
      bind:this={fileInput}
      on:change={handleChange}
      class="form-control border-0 shadow-none h-100 w-100"
      style="opacity: 0; position: absolute; z-index: 5; cursor: pointer;"
    />
    <div class="d-flex flex-column align-items-center justify-content-center p-4 text-center" style="border: 2px dashed var(--glass-border); border-radius: 15px; background: rgba(255,255,255,0.05);">
        {#if !file}
            <i class="bi bi-cloud-arrow-up fs-1 mb-2" style="color: var(--color-accent);"></i>
            <span class="text-muted small">Drag & drop or click to upload</span>
        {:else}
            <i class="bi bi-file-earmark-check fs-1 mb-2 text-success"></i>
            <span class="fw-bold">{file.name}</span>
        {/if}
    </div>
  </div>

  {#if file}
    <div class="mt-3 d-flex align-items-center justify-content-between p-3 rounded-4" style="background: rgba(255,255,255,0.1); border: 1px solid var(--glass-border);">
      <div>
        <strong style="color: var(--color-text-main);">{file.name}</strong> 
        <span class="ms-2 small" style="color: var(--color-text-muted);">({(file.size / 1024).toFixed(1)} KB)</span>
      </div>
      <button type="button" class="btn btn-outline-danger btn-sm rounded-pill px-3" style="z-index: 10;" on:click={remove}>
        Remove
      </button>
    </div>

    {#if headers.length > 0}
      <div class="mt-3">
        <label for="column-select-comp" class="form-label fw-bold small text-uppercase">Select Column</label>
        <select
          id="column-select-comp"
          bind:value={selectedColumn}
          class="form-select"
          on:change={() => dispatch('fileChange', { file, selectedColumn, headers })}
        >
          {#each headers as header, i}
            <option value={header}>{header} (Col {i + 1})</option>
          {/each}
        </select>
      </div>
    {/if}
  {/if}
</div>