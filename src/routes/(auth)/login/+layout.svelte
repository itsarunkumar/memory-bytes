<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="w-full h-screen flex justify-center items-center flex-col gap-5">
	<slot />
</div>
