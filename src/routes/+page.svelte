<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import ErrorMessageBox from '$lib/components/layout/ErrorMessageBox.svelte';
	import type { IButton } from '$lib/interfaces/components/IButton';
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

	const loginButtonProps: IButton = {
		id: 'login',
		label: 'Sign in',
		type: 'primary'
	};

	const errorMessageBoxProps: IErrorMessageBox = {
		id: "error-message-box"
	};
</script>

<div class="flex flex-col h-screen justify-center items-center bg-neutral-content">
	<div class="card w-96 shadow-xl px-8 pt-4 pb-8 bg-base-100">
		<h1 class="text-2xl mb-4 text-center">Welcome</h1>
		<hr />
		<TextInput props={usernameInputProps} extraClasses="my-4" />
		<TextInput props={passwordInputProps} extraClasses="mb-8" />
		<Button props={loginButtonProps} />
	</div>
	<ErrorMessageBox props={errorMessageBoxProps}/>
</div>
 