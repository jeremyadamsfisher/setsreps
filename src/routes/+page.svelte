<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
</script>

<div class="flex h-full gap-2 items-center justify-center">
    <a href="/workout">
        <Button>Start a workout</Button>
    </a>
    <a href="/history">
        <Button variant="secondary">Use an old workout as a template</Button>
    </a>
</div>