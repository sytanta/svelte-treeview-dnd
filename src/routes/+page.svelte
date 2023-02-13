<script lang="ts">
	import type { Node, Tree } from '$lib/types';

	import TreeView from '$lib/TreeView.svelte';
	import DocIcon from './Icons/Doc.svelte';
	import PdfIcon from './Icons/Pdf.svelte';
	import PptIcon from './Icons/Ppt.svelte';
	import XlsIcon from './Icons/Xls.svelte';
	import ArrowRight from './Icons/ArrowRight.svelte';
	import ArrowDown from './Icons/ArrowDown.svelte';

	const tree1: Tree = {
		children: ['folder1', 'folder2', 'folder3'],
		folder1: { type: 'container', name: 'Folder 1', id: 'folder1', collapsed: true },
		folder2: {
			type: 'container',
			name: 'Folder 2',
			id: 'folder2',
			children: ['folder2a', 'folder2b', 'folder2c']
		},
		folder3: {
			type: 'container',
			name: 'Folder 3',
			id: 'folder3',
			children: ['file3a', 'folder3b', 'file3c']
		},
		folder2a: { type: 'container', name: 'Folder 2a', id: 'folder2a' },
		folder2b: { type: 'container', name: 'Folder 2b', id: 'folder2b' },
		folder2c: { type: 'container', name: 'Folder 2c', id: 'folder2c' },
		file3a: { type: 'leaf', name: 'document.docx', id: 'file3a', iconComponent: DocIcon },
		folder3b: {
			type: 'container',
			name: 'Folder 3b',
			id: 'folder3b',
			children: ['file3ba', 'folder3bb', 'file3bc']
		},
		file3c: { type: 'leaf', name: 'document.xls', id: 'file3c', iconComponent: XlsIcon },
		file3ba: { type: 'leaf', name: 'document.pdf', id: 'file3ba', iconComponent: PdfIcon },
		folder3bb: { type: 'container', name: 'Folder 3bb', id: 'folder3bb' },
		file3bc: { type: 'leaf', name: 'document.ppt', id: 'file3bc', iconComponent: PptIcon }
	};

	let tree2: Tree = {
		children: ['folder1', 'folder2', 'folder3'],
		folder1: { type: 'container', name: 'Folder 1', id: 'folder1', collapsed: true },
		folder2: {
			type: 'container',
			name: 'Folder 2',
			id: 'folder2',
			children: ['folder2a', 'folder2b', 'folder2c']
		},
		folder3: {
			type: 'container',
			name: 'Folder 3',
			id: 'folder3',
			children: ['file3a', 'folder3b', 'file3c']
		},
		folder2a: { type: 'container', name: 'Folder 2a', id: 'folder2a' },
		folder2b: { type: 'container', name: 'Folder 2b', id: 'folder2b' },
		folder2c: { type: 'container', name: 'Folder 2c', id: 'folder2c' },
		file3a: { type: 'leaf', name: 'document.docx', id: 'file3a', iconComponent: DocIcon },
		folder3b: {
			type: 'container',
			name: 'Folder 3b',
			id: 'folder3b',
			children: ['file3ba', 'folder3bb', 'file3bc']
		},
		file3c: { type: 'leaf', name: 'document.xls', id: 'file3c', iconComponent: XlsIcon },
		file3ba: { type: 'leaf', name: 'document.pdf', id: 'file3ba', iconComponent: PdfIcon },
		folder3bb: { type: 'container', name: 'Folder 3bb', id: 'folder3bb' },
		file3bc: { type: 'leaf', name: 'document.ppt', id: 'file3bc', iconComponent: PptIcon }
	};
	let collapseAll = false;

	const tree3: Tree = {
		children: ['folder1', 'folder2', 'folder3'],
		folder1: {
			type: 'container',
			name: 'Folder 1',
			id: 'folder1',
			collapsed: true,
			iconComponent: ArrowDown,
			iconComponentCollapsed: ArrowRight
		},
		folder2: {
			type: 'container',
			name: 'Folder 2',
			id: 'folder2',
			iconComponent: ArrowDown,
			iconComponentCollapsed: ArrowRight,
			children: ['folder2a', 'folder2b', 'folder2c']
		},
		folder3: {
			type: 'container',
			name: 'Folder 3',
			id: 'folder3',
			children: ['file3a', 'folder3b', 'file3c']
		},
		folder2a: {
			type: 'container',
			name: 'Folder 2a',
			id: 'folder2a',
			iconComponent: ArrowDown,
			iconComponentCollapsed: ArrowRight
		},
		folder2b: {
			type: 'container',
			name: 'Folder 2b',
			id: 'folder2b',
			iconComponent: ArrowDown,
			iconComponentCollapsed: ArrowRight
		},
		folder2c: {
			type: 'container',
			name: 'Folder 2c',
			id: 'folder2c',
			iconComponent: ArrowDown,
			iconComponentCollapsed: ArrowRight
		},
		file3a: { type: 'leaf', name: 'document.docx', id: 'file3a', iconComponent: DocIcon },
		folder3b: {
			type: 'container',
			name: 'Folder 3b',
			id: 'folder3b',
			children: ['file3ba', 'folder3bb', 'file3bc']
		},
		file3c: { type: 'leaf', name: 'document.xls', id: 'file3c', iconComponent: XlsIcon },
		file3ba: { type: 'leaf', name: 'document.pdf', id: 'file3ba', iconComponent: PdfIcon },
		folder3bb: { type: 'container', name: 'Folder 3bb', id: 'folder3bb' },
		file3bc: { type: 'leaf', name: 'document.ppt', id: 'file3bc', iconComponent: PptIcon }
	};

	function toggleCollapse() {
		for (let id of Object.keys(tree2)) {
			if (id === 'children') continue;
			if (!tree2[id].disabled) tree2[id].collapsed = !collapseAll;
		}

		collapseAll = !collapseAll;
	}

	function toggleFolder() {
		tree2['folder2'].disabled = !tree2['folder2'].disabled;
	}

	function handleNodeClick(event: CustomEvent<{ node: Node }>) {
		const { node } = event.detail;
		const { collapsed } = node;

		if (node.type === 'leaf') return;

		tree2[node.id].collapsed = !collapsed;
		tree2 = tree2;
	}
</script>

<svelte:head>
	<title>svelte-treeview-dnd</title>
</svelte:head>

<header>
	<h1>svelte-treeview-dnd</h1>
	<p>Simple treeview component made with Svelte</p>
</header>

<section class="container">
	<div class="tree">
		<h3>Uncontrolled tree view</h3>
		<TreeView tree={tree1} />
	</div>
	<div class="tree">
		<h3>Controlled tree view</h3>
		<div class="actions">
			<button on:click={toggleCollapse}>{collapseAll ? 'Expand all' : 'Collapse all'}</button>
			<button on:click={toggleFolder}
				>{tree2['folder2'].disabled ? 'Enable "Folder 2"' : 'Disable "Folder 2"'}</button
			>
		</div>
		<TreeView bind:tree={tree2} collapseControlled={true} on:node-click={handleNodeClick} />
	</div>
	<div class="tree">
		<h3>Custom folder icon</h3>
		<TreeView tree={tree3} />
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
		grid-template-columns: repeat(1, 1fr);
		min-height: 70vh;
	}

	@media (min-width: 720px) {
		.container {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 980px) {
		.container {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.tree {
		padding-left: 3rem;
	}

	.actions {
		margin-bottom: 1rem;
	}

	:global(.disabled) {
		opacity: 0.3;
	}
</style>
