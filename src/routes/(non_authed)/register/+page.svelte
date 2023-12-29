<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import ErrorMessageBox from '$lib/components/layout/ErrorMessageBox.svelte';
	import type ButtonProps from '$lib/components/props/components/ButtonProps';
	import type LinkButtonProps from '$lib/components/props/components/LinkButtonProps';
	import type TextInputPropsut } from '$lib/components/props/components/ITextInput';
	import type { IErrorMessageBox } from '$lib/components/props/layout/IErrorMessageBox';
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

	const usernameTextInputProps: ITextInput = {
		name: 'username',
		label: 'Username',
		placeholder: 'Enter your username',
		required: true
	};

	const passwordTextInputProps: ITextInput = {
		name: 'password',
		label: 'Password',
		placeholder: 'Enter your password',
		type: 'password',
		required: true
	};

	const confirmPasswordTextInputProps: ITextInput = {
		name: 'confirm_password',
		label: 'Confirm password',
		placeholder: 'Re-enter your password',
		type: 'password',
		required: true
	};

	const registerButtonProps: ButtonProps = {
		id: 'register',
		label: 'Register',
		type: 'primary'
	};

	const loginLinkButtonProps: LinkButtonProps = {
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

<svelte:head>
	<title>Register</title>
</svelte:head>

<CenteredLayout>
	<FormCard title="Register" errorMessage={$message}>
		<form use:enhance method="post">
			<TextInput
				props={{ ...usernameInputProps, value: $form.username, errorMessage: $errors.username }}
				extraClasses="mb-4 w-full"
			/>
			<TextInput
				props={{
					...passwordInputProps,
					value: $form.password,
					errorMessage: $errors.password || $errors.confirm
				}}
				extraClasses="mb-4 w-full"
			/>
			<TextInput
				props={{
					...confirmPasswordInputProps,
					value: $form.confirm_password,
					errorMessage: $errors.confirm_password || $errors.confirm
				}}
				extraClasses="mb-8 w-full"
			/>
			<Button props={registerButtonProps} extraClasses="mb-4 w-full" />
		</form>

		<hr class="mb-4" />
		<LinkButton props={loginLinkButtonProps} />
	</FormCard>
</CenteredLayout>
