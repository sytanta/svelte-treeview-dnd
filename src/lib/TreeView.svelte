<script lang="ts" context="module">
	function traverseNodes(nodes: TreeViewNode[], nodesInternalObj: Record<string, TreeViewNode>) {
		nodes.map((node) => {
			nodesInternalObj[node.id] = node;

			if (node.children) traverseNodes(node.children, nodesInternalObj);
		});
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { TreeViewNode } from './types';

	import TreeNode from './TreeNode.svelte';

	export let nodes: TreeViewNode[] = [];
	export let collapseControlled: boolean = false;
	export let treeClass: string = '';
	export let treeNodeClass: string = '';
	export let childrenContainerClass: string = '';
	export let childPaddingLeft: string = '1rem';

	const emit = createEventDispatcher();
	let nodesInternal: TreeViewNode[] = nodes;
	let nodesInternalObj: Record<string, TreeViewNode> = {};

	$: if (collapseControlled) {
		nodesInternal = nodes;
	}

	if (!collapseControlled) traverseNodes(nodes, nodesInternalObj);

	function handleNodeClick(event: CustomEvent<{ node: TreeViewNode; collapsed: boolean }>) {
		const { node, collapsed } = event.detail;

		if (!collapseControlled) {
			nodesInternalObj[node.id].collapsed = collapsed;
		}

		emit('node-click', event.detail);
	}
</script>

<div class={'tree-view ' + treeClass}>
	{#each nodesInternal as node (node.id)}
		<div>
			<TreeNode
				{node}
				{collapseControlled}
				{treeNodeClass}
				{childrenContainerClass}
				{childPaddingLeft}
				on:node-click={handleNodeClick}
			/>
		</div>
	{/each}
</div>
