<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import ErrorMessageBox from '$lib/components/layout/ErrorMessageBox.svelte';
	import type { IButton } from '$lib/interfaces/components/IButton';
	import type { ILinkButton } from '$lib/interfaces/components/ILinkButton';
	import type { ITextInput } from '$lib/interfaces/components/ITextInput';
	import type { IErrorMessageBox } from '$lib/interfaces/layout/IErrorMessageBox';
	import type { PageData } from './$types';

	export let data: PageData;

	const usernameInputProps: ITextInput = {
		name: 'username',
		label: 'Username',
		placeholder: 'Enter your username'
	};

	const passwordInputProps: ITextInput = {
		name: 'password',
		label: 'Password',
		placeholder: 'Enter your password',
		type: 'password'
	};

	const confirmPasswordInputProps: ITextInput = {
		name: 'confirm_password',
		label: 'Confirm password',
		placeholder: 'Re-enter your password',
		type: 'password'
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
		id: 'error-message-box'
	};
</script>

<div
	class="flex flex-col min-h-[calc(100vh-var(--navbar-height))] justify-center items-center bg-neutral-content"
>
	<div class="card w-96 shadow-xl px-8 py-4 bg-base-100">
		<h1 class="text-2xl mb-4 text-center">Register</h1>
		<hr class="mb-4" />
		<TextInput props={usernameInputProps} extraClasses="mb-4" />
		<TextInput props={passwordInputProps} extraClasses="mb-4" />
		<TextInput props={confirmPasswordInputProps} extraClasses="mb-8" />
		<Button props={registerButtonProps} extraClasses="mb-4" />
		<hr class="mb-4" />
		<LinkButton props={loginLinkButtonProps} />
	</div>
	<ErrorMessageBox props={errorMessageBoxProps} />
</div>
