<script lang="ts" context="module">
	import type { Node, Tree } from './types';

	function traverseNodes(tree: Tree, nodes: string[], parentNodeId?: string) {
		nodes.forEach((nodeId) => {
			const node: Node | undefined = tree[nodeId];
			if (!node) return;

			node.parentNodeId = parentNodeId;
			if (node.children?.length) {
				traverseNodes(tree, node.children, node.id);
			}
		});
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import TreeNode from './TreeNode.svelte';

	export let tree: Tree;
	export let collapseControlled: boolean = false;
	export let treeClass: string = '';
	export let treeNodeClass: string = '';
	export let childrenContainerClass: string = '';
	export let childPaddingLeft: string = '1rem';

	const emit = createEventDispatcher();

	traverseNodes(tree, tree.children);

	function handleNodeClick(event: CustomEvent<{ node: Node; collapsed: boolean }>) {
		const { node, collapsed } = event.detail;

		if (!collapseControlled) {
			tree[node.id].collapsed = collapsed;
		}

		emit('node-click', event.detail);
	}
</script>

<div class={'tree-view ' + treeClass}>
	{#each tree.children as nodeId (nodeId)}
		<div>
			<TreeNode
				{tree}
				node={tree[nodeId]}
				{collapseControlled}
				{treeNodeClass}
				{childrenContainerClass}
				{childPaddingLeft}
				on:node-click={handleNodeClick}
			/>
		</div>
	{/each}
</div>
