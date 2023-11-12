<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import ErrorMessageBox from '$lib/components/layout/ErrorMessageBox.svelte';
	import type { IButton } from '$lib/interfaces/components/IButton';
	import type { ILinkButton } from '$lib/interfaces/components/ILinkButton';
	import type { ITextInput } from '$lib/interfaces/components/ITextInput';
	import type { IErrorMessageBox } from '$lib/interfaces/layout/IErrorMessageBox';
	import { get } from 'svelte/store';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import CenteredLayout from '$lib/components/layout/CenteredLayout.svelte';
	import FormCard from '$lib/components/layout/FormCard.svelte';

	export let data: PageData;

	const { form, errors, enhance, message } = superForm(data.form, {
		clearOnSubmit: 'none',
		resetForm: false
	});

	const usernameInputProps: ITextInput = {
		name: 'username',
		label: 'Username',
		placeholder: 'Enter your username',
		required: true
	};

	const passwordInputProps: ITextInput = {
		name: 'password',
		label: 'Password',
		placeholder: 'Enter your password',
		// type: 'text',
		required: true
	};

	const confirmPasswordInputProps: ITextInput = {
		name: 'confirm_password',
		label: 'Confirm password',
		placeholder: 'Re-enter your password',
		// type: 'password',
		required: true
	};

	const registerButtonProps: IButton = {
		id: 'register',
		label: 'Register',
		type: 'primary'
	};

	const loginLinkButtonProps: ILinkButton = {
		id: 'login-link-button',
		label: 'Already a member? Log in here.',
		href: '/login'
	};

	const errorMessageBoxProps: IErrorMessageBox = {
		id: 'error-message-box',
		message: get(message),
		show: true
	};
</script>

<CenteredLayout>
	<FormCard title="Register">
		<form use:enhance method="post">
			<TextInput
				props={{ ...usernameInputProps, value: $form.username, errorMessage: $errors.username }}
				extraClasses="mb-4 w-full"
			/>
			<TextInput
				props={{ ...passwordInputProps, value: $form.password, errorMessage: $errors.password || $errors.confirm }}
				extraClasses="mb-4 w-full"
			/>
			<TextInput
				props={{
					...confirmPasswordInputProps, value: $form.confirm_password, 
					errorMessage: $errors.confirm_password || $errors.confirm
				}}
				extraClasses="mb-8 w-full"
			/>
			<Button props={registerButtonProps} extraClasses="mb-4 w-full" />
		</form>

		<hr class="mb-4" />
		<LinkButton props={loginLinkButtonProps} />
	</FormCard>
	<ErrorMessageBox
		extraClasses="mt-4 w-full sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/4"
		props={{ ...errorMessageBoxProps, message: $message, show: $message }}
	/>
</CenteredLayout>
