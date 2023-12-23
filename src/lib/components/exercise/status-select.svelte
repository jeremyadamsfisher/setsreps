<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Check, ChevronsUpDown, Circle, Trash } from 'lucide-svelte';
	import { doc, setDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { deleteDoc } from 'firebase/firestore';
	import { docStore } from 'sveltefire';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    let statuses = ['Pending', 'Completed', 'Failed'];

    export let sessionId: string;
    let exerciseId = 'CNi8DSuCrUiKYMqUuApO';
    export let setId: string;

    let setDoc_ = doc(db, 'session', sessionId, 'exercises', exerciseId, 'set', setId);
    let exercise = docStore(db, setDoc_);

    function updateSetStatus(newStatus: string) {
        setDoc(setDoc_, { status: newStatus }, { merge: true });
    }

    function removeSet() {
        deleteDoc(setDoc_);
    }
  </script>
  
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
        <Button builders={[builder]} variant="ghost" role="combobox" class="w-[120px]">
			{$exercise?.status || 'Pending'}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56"> 
        <DropdownMenu.Group>
            {#each statuses as status}
            <DropdownMenu.Item
            on:click={() => {
                updateSetStatus(status);
            }}
            >
                {#if status === $exercise?.status}
                    <Check class="mr-2 h-4 w-4 shrink-0 opacity-50" />
                {:else}
                    <Circle class="mr-2 h-4 w-4 shrink-0 opacity-50" />
                {/if}
                <span>{status}</span>
            </DropdownMenu.Item>
            {/each}
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
            <DropdownMenu.Item on:click={removeSet}>
                <Trash class="mr-2 h-4 w-4 shrink-0 opacity-50" />
                Remove
            </DropdownMenu.Item>
        </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>