<script lang="ts">
	import type { PageData } from './$types';
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import type TextInputProps from '$lib/components/props/components/TextInputProps';
	import TextInput from '$lib/components/TextInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import type ButtonProps from '$lib/components/props/components/ButtonProps';
	import { ImportIcon } from '$lib/data/icons';
	import { superForm } from 'sveltekit-superforms/client';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';

	export let data: PageData;

	const { form, errors, enhance, message } = superForm(data.form, {
		clearOnSubmit: 'none',
		resetForm: false
	});

	const bggUsernameInputProps: TextInputProps = {
		name: 'bgg-username-input',
		label: 'BGG Username',
		placeholder: 'Enter your BGG username',
		required: true
	};

	$: importCollectionButtonProps = {
		id: 'bgg-import-btn',
		label: 'Import',
		type: 'primary',
		icon: ImportIcon
	} satisfies ButtonProps;

	$: errorMessage = $errors['bgg-username-input'];
	$: hasError = $errors['bgg-username-input'] !== undefined;
</script>

<BasePageLayout>
	<PageHeaderToolbar title="Import games from BoardGameGeek" />

	<div class="prose mb-4">
		<p>
			If you have a BGG account, you can import your games from there. Just enter your BGG username
			below. The games will be added to your collection automatically.
		</p>
		<form use:enhance method="post">
			<TextInput props={{ ...bggUsernameInputProps, errorMessage, hasError }} extraClasses="mb-4" />
			<Button props={importCollectionButtonProps} extraClasses="mb-4 w-full" />
		</form>
	</div>
	
</BasePageLayout>
