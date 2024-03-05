<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import {
    FlipButton,
    ThemeManager,
    Toaster,
    theme,
    toast
  } from '@jill64/svelte-suite'
  import { PauseIcon, PlayIcon, RotateCwIcon } from '@jill64/svelte-suite/icons'
  import { ActionButton } from '@jill64/svelte-suite/input'
  import { CodeCopy } from 'svelte-code-copy'
  import '../app.postcss'

  let { data } = $props()
  let output: HTMLPreElement | null

  let state = $derived(data.status?.State?.Name)
  let is_running = $derived(state === 'running' || state === 'pending')

  $effect(() => {
    if (output) {
      output.scrollTop = output.scrollHeight
    }
  })
</script>

<Toaster dark={$theme === 'dark'} />
<ThemeManager />

<svelte:head>
  <title>Ourcraft</title>
</svelte:head>

<header class="flex items-center mx-2 justify-between">
  <a href="/">
    <h1 class="font-bold text-4xl">Ourcraft</h1>
  </a>
  <FlipButton />
</header>

<main class="m-4">
  <div class="flex flex-wrap items-center gap-6 my-6">
    <article>
      <h3>Status</h3>
      <section>
        <p
          class="font-bold text-xl
          {state === 'running' ? 'text-green-500' : ''}
          {state === 'stopped' ? 'text-zinc-500' : ''}"
        >
          {state ? state : 'Unavailable'}
        </p>
      </section>
    </article>
    <article>
      <h3>Public IP</h3>
      <section class="flex mr-8">
        <span>
          <CodeCopy top="0" right="-2rem">
            <code>{data.status?.PublicIpAddress ?? 'Unavailable'}</code>
          </CodeCopy>
        </span>
      </section>
    </article>
    <ActionButton
      onClick={async () => {
        const res = await fetch(is_running ? '/stop' : '/start', {
          method: 'POST'
        })

        if (res.ok) {
          $toast.success(
            `Instance ${is_running ? 'stopped' : 'started'} successfully.`
          )
        } else {
          $toast.error(
            'Failed to start/stop the instance. Please try again later.'
          )
        }

        await invalidateAll()
      }}
      label={is_running ? 'Pause' : 'Start'}
      Class="text-xl rounded-full px-5 py-2.5 push-effect bg-white dark:bg-zinc-100 text-black"
    >
      {#if is_running}
        <PauseIcon />
      {:else}
        <PlayIcon />
      {/if}
    </ActionButton>
    <ActionButton
      onClick={invalidateAll}
      label="Refresh"
      Class="text-xl border border-zinc-500 rounded-full px-5 py-2.5 push-effect dark:pop-effect"
    >
      <RotateCwIcon />
    </ActionButton>
  </div>
  <output>
    <pre
      bind:this={output}
      class="border my-4 h-[50vh] rounded p-2 border-zinc-500 overflow-auto"><code
        >{atob(data.output ?? '')}</code
      ></pre>
  </output>
</main>
