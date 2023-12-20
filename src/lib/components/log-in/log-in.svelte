<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { auth } from '$lib/firebase';
	import { Button } from '$lib/components/ui/button';
	import FaGoogle from 'svelte-icons/fa/FaGoogle.svelte';
	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

	const provider = new GoogleAuthProvider();

	async function signInWithGoogle() {
		await signInWithPopup(auth, provider);
	}
</script>

<div class="w-full h-full flex justify-center items-center">
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>Log in to your account</Card.Title>
			<Card.Description>Sets & Reps keeps tracks of, well, sets and reps.</Card.Description>
		</Card.Header>
		<Card.Content>
			<Button class="flex gap-2 w-full" on:click={signInWithGoogle}>
				<div class="w-[0.9rem] h-[0.9rem]">
					<FaGoogle />
				</div>
				Continue With Google
			</Button>
		</Card.Content>
	</Card.Root>
</div>
