<script lang="ts">
	import type { TreeViewNode } from '$lib/types';

	import TreeView from '$lib/TreeView.svelte';
	import DocIcon from './Icons/Doc.svelte';
	import PdfIcon from './Icons/Pdf.svelte';
	import PptIcon from './Icons/Ppt.svelte';
	import XlsIcon from './Icons/Xls.svelte';
	import ArrowRight from './Icons/ArrowRight.svelte';
	import ArrowDown from './Icons/ArrowDown.svelte';

	const nodes1: TreeViewNode[] = [
		{ type: 'container', name: 'Folder 1', id: 'folder1', collapsed: true },
		{
			type: 'container',
			name: 'Folder 2',
			id: 'folder2',
			children: [
				{ type: 'container', name: 'Folder 2a', id: 'folder2a' },
				{ type: 'container', name: 'Folder 2b', id: 'folder2b' },
				{ type: 'container', name: 'Folder 2c', id: 'folder2c' }
			]
		},
		{
			type: 'container',
			name: 'Folder 3',
			id: 'folder3',
			children: [
				{ type: 'leaf', name: 'document.docx', id: 'file3a', iconComponent: DocIcon },
				{
					type: 'container',
					name: 'Folder 3b',
					id: 'folder3b',
					children: [
						{ type: 'leaf', name: 'document.pdf', id: 'file3ba', iconComponent: PdfIcon },
						{ type: 'container', name: 'Folder 3bb', id: 'folder3bb' },
						{ type: 'leaf', name: 'document.ppt', id: 'file3bc', iconComponent: PptIcon }
					]
				},
				{ type: 'leaf', name: 'document.xls', id: 'file3c', iconComponent: XlsIcon }
			]
		}
	];

	let nodes2: TreeViewNode[] = [
		{ type: 'container', name: 'Folder 1', id: 'folder1', collapsed: true },
		{
			type: 'container',
			name: 'Folder 2',
			id: 'folder2',
			children: [
				{ type: 'container', name: 'Folder 2a', id: 'folder2a' },
				{ type: 'container', name: 'Folder 2b', id: 'folder2b' },
				{ type: 'container', name: 'Folder 2c', id: 'folder2c' }
			]
		},
		{
			type: 'container',
			name: 'Folder 3',
			id: 'folder3',
			children: [
				{ type: 'leaf', name: 'document.docx', id: 'file3a', iconComponent: DocIcon },
				{
					type: 'container',
					name: 'Folder 3b',
					id: 'folder3b',
					children: [
						{ type: 'leaf', name: 'document.pdf', id: 'file3ba', iconComponent: PdfIcon },
						{ type: 'container', name: 'Folder 3bb', id: 'folder3bb' },
						{ type: 'leaf', name: 'document.ppt', id: 'file3bc', iconComponent: PptIcon }
					]
				},
				{ type: 'leaf', name: 'document.xls', id: 'file3c', iconComponent: XlsIcon }
			]
		}
	];
	let nodes2Obj: Record<string, TreeViewNode> = {};
	let collapseAll = false;

	traverseNodes(nodes2);

	const nodes3: TreeViewNode[] = [
		{
			type: 'container',
			name: 'Folder 1',
			id: 'folder1',
			collapsed: true,
			iconComponent: ArrowDown,
			iconComponentCollapsed: ArrowRight
		},
		{
			type: 'container',
			name: 'Folder 2',
			id: 'folder2',
			iconComponent: ArrowDown,
			iconComponentCollapsed: ArrowRight,
			children: [
				{
					type: 'container',
					name: 'Folder 2a',
					id: 'folder2a',
					iconComponent: ArrowDown,
					iconComponentCollapsed: ArrowRight
				},
				{
					type: 'container',
					name: 'Folder 2b',
					id: 'folder2b',
					iconComponent: ArrowDown,
					iconComponentCollapsed: ArrowRight
				},
				{
					type: 'container',
					name: 'Folder 2c',
					id: 'folder2c',
					iconComponent: ArrowDown,
					iconComponentCollapsed: ArrowRight
				}
			]
		},
		{
			type: 'container',
			name: 'Folder 3',
			id: 'folder3',
			children: [
				{ type: 'leaf', name: 'document.docx', id: 'file3a', iconComponent: DocIcon },
				{
					type: 'container',
					name: 'Folder 3b',
					id: 'folder3b',
					children: [
						{ type: 'leaf', name: 'document.pdf', id: 'file3ba', iconComponent: PdfIcon },
						{ type: 'container', name: 'Folder 3bb', id: 'folder3bb' },
						{ type: 'leaf', name: 'document.ppt', id: 'file3bc', iconComponent: PptIcon }
					]
				},
				{ type: 'leaf', name: 'document.xls', id: 'file3c', iconComponent: XlsIcon }
			]
		}
	];

	function toggleCollapse() {
		for (let id of Object.keys(nodes2Obj)) {
			nodes2Obj[id].collapsed = !collapseAll;
		}

		collapseAll = !collapseAll;
		nodes2 = nodes2;
	}

	function handleNodeClick(event: CustomEvent<{ node: TreeViewNode }>) {
		const { node } = event.detail;
		const { collapsed } = node;

		if (node.type === 'leaf') return;

		nodes2Obj[node.id].collapsed = !collapsed;
		nodes2 = nodes2;
	}

	function traverseNodes(nodes: TreeViewNode[]) {
		nodes.map((node) => {
			nodes2Obj[node.id] = node;
			if (node.children) traverseNodes(node.children);
		});
	}
</script>

<svelte:head>
	<title>svelte-treeview</title>
</svelte:head>

<header>
	<h1>svelte-treeview</h1>
	<p>Simple treeview component made with Svelte</p>
</header>

<section class="container">
	<div class="tree">
		<h3>Uncontrolled tree view</h3>
		<TreeView nodes={nodes1} />
	</div>
	<div class="tree">
		<h3>Controlled tree view</h3>
		<div class="actions">
			<button on:click={toggleCollapse}>{collapseAll ? 'Expand all' : 'Collapse all'}</button>
		</div>
		<TreeView nodes={nodes2} collapseControlled={true} on:node-click={handleNodeClick} />
	</div>
	<div class="tree">
		<h3>Custom folder icon</h3>
		<TreeView nodes={nodes3} />
	</div>
</section>

<style>
	header {
		text-align: center;
	}

	h1 {
		margin-bottom: 0.1rem;
	}

	.container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	.tree {
		padding-left: 3rem;
	}

	.actions {
		margin-bottom: 1rem;
	}
</style>
