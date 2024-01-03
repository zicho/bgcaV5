<script lang="ts">
    export let name: string = "";
    export let fullWidth: boolean = false;
    export let width = "w-32"
</script>

<span class="text-sm {fullWidth ? "flex-grow" : `flex-none ${width}`}">{name}</span>
