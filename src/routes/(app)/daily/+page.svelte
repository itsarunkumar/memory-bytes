<script lang="ts">
	import { format } from 'date-fns';
	import { CalendarDays, File } from 'lucide-svelte';
	export let data: import('./$types').PageData;
</script>

<div class="w-full flex flex-wrap justify-center items-center gap-5 my-10">
	{#if data.df}
		{#each data.df as f, i (i)}
			<div
				class=" w-80 min-h-[200px] flex flex-col justify-start items-start border px-5 py-2 rounded-md relative shadow-md"
			>
				<CalendarDays class="w-6 h-6 absolute top-2 right-2" />
				<span class="text-lg flex flex-col self-start w-full border-b">
					{format(new Date(f.date), 'MMM d, yyyy')}
					<span class="text-sm my-2 text-muted-foreground">
						bytes:{f.bytes.length}
					</span>
				</span>

				<div class="flex justify-center items-start flex-col">
					{#each f.bytes as byte}
						<p class="flex gap-2 items-center my-2">
							<File class="w-4 h-4" />
							<a
								href="/editor?byte={byte.id}&byte=read&byte={byte.folderId}"
								class="flex gap-2 justify-between items-center text-lg w-full overflow-hidden text-ellipsis"
							>
								{byte.title}
							</a>
						</p>
					{/each}
				</div>
			</div>
		{/each}
	{/if}
</div>

<!-- <form action="/daily">
	<input type="search" name="date" id="date" />
	<button>submit</button>
</form> -->
