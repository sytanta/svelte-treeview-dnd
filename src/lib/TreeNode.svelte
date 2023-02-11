<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { Node, Tree } from './types';

	import FolderOpen from './Icons/FolderOpen.svelte';
	import FolderClosed from './Icons/FolderClosed.svelte';

	export let tree: Tree;
	export let node: Node;
	export let collapseControlled: boolean = false;
	export let treeNodeClass: string = '';
	export let childrenContainerClass: string = '';
	export let childPaddingLeft: string = '1rem';

	const emit = createEventDispatcher();
	let collapsedState: boolean = !!node.collapsed;

	$: if (collapseControlled) {
		collapsedState = !!node.collapsed;
	}

	$: nodeClass = `tree-view_node ${node.type} ${
		collapsedState ? 'tree-view_node-collapsed' : ''
	} ${treeNodeClass}`;

	$: arrowClass = `tree-view_arrow ${collapsedState ? 'tree-view_arrow-collapsed' : ''}`;

	$: childContainerClass = `tree-view_children ${
		collapsedState ? 'tree-view_children-collapsed' : ''
	}`;

	function handleClick() {
		if (node.type === 'container' && !collapseControlled) collapsedState = !collapsedState;
		emit('node-click', { node, collapsed: collapsedState });
	}
</script>

<button class={nodeClass} on:click={handleClick}>
	{#if node.iconComponentCollapsed && collapsedState}
		<svelte:component this={node.iconComponentCollapsed} />
	{:else if node.iconComponent}
		<svelte:component this={node.iconComponent} />
	{:else if node.type === 'container' && collapsedState}
		<div class={arrowClass}><FolderClosed /></div>
	{:else if node.type === 'container' && !collapsedState}
		<div class={arrowClass}><FolderOpen /></div>
	{/if}
	{#if node.nameComponent}
		<svelte:component this={node.nameComponent} collapsed={collapsedState} />
	{:else}
		<div class="tree-view_name">{node.name}</div>
	{/if}
</button>
{#if !collapsedState && node.type === 'container' && node.children?.length}
	<div
		class={childContainerClass + ' ' + childrenContainerClass}
		style:margin-left={childPaddingLeft}
	>
		{#each node.children as childId (childId)}
			<div>
				<svelte:self
					{tree}
					node={tree[childId]}
					{treeNodeClass}
					{childrenContainerClass}
					on:node-click
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.tree-view_node {
		align-items: center;
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		gap: 0.3rem;
		padding: 0.2rem 0;
	}

	.tree-view_arrow {
		align-items: center;
		display: flex;
	}
</style>
