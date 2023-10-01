<script lang="ts">
	const n = ['note taker', 'todo list', 'thoughts writer', 'planer'];
</script>

<div class="w-full min-h-[calc(100vh-6rem)] flex items-center justify-evenly flex-col">
	<div class="flex flex-col items-center text-center gap-5">
		<h1 class="text-9xl">Bytes</h1>
		<p class="font-semibold text-lg">a place where you can write your bytes and share them</p>
	</div>

	<div class="flex flex-col gap-10 items-center justify-center">
		<div class="flex items-center justify-center gap-20 flex-wrap">
			{#each n as t, i (i)}
				<div
					class=" flex items-center justify-center text-center bg-primary-foreground w-40 h-40 border rounded-md shadow transition-shadow duration-300 hover:shadow-slate-200 dark:hover:shadow-slate-800 hover:-translate-y-1 hover:transition-transform"
				>
					<span class="absolute text-lg whitespace-nowrap capitalize">{t}</span>
				</div>
			{/each}
		</div>
		<p class="text-2xl">you can use it however see you fit!</p>
	</div>
</div>
