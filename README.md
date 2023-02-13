# svelte-treeview-dnd

Simple and easy-to-use JSON-based treeview component with:

- custom icon
- controlled & uncontrolled modes
- ability to disable tree nodes

## Install the package

```bash
npm i svelte-treeview-dnd
```

## Usage

- Basic usage

```bash
<script lang="ts">
    import TreeView, { type Tree } from 'svelte-treeview-dnd';

    const tree: Tree = {
		children: ['folder1', 'folder2'],
        folder1: { type: 'folder', name: 'Folder 1', id: 'folder1', collapsed: true },
		folder2: {
			type: 'folder',
			name: 'Folder 2',
			id: 'folder2',
			children: ['folder2a', 'folder2b', 'folder2c']
		},
		folder2a: { type: 'folder', name: 'Folder 2a', id: 'folder2a' },
		folder2b: { type: 'folder', name: 'Folder 2b', id: 'folder2b' },
		folder2c: { type: 'folder', name: 'Folder 2c', id: 'folder2c' }
	}
</script>

<TreeView tree={tree} />
```

- Custom icons

```bash
<script lang="ts">
    import TreeView, { type Tree } from 'svelte-treeview-dnd';

	import CustomIconFolder from '$lib/components/CustomIconFolder.svelte'
	import CustomIconFolderCollapsed from '$lib/components/CustomIconFolderCollapsed.svelte'
	import CustomIconFile from '$lib/components/CustomIconFile.svelte'

    const tree: Tree = {
		children: ['folder1', 'folder2'],
        folder1: {
			type: 'folder',
			name: 'Folder 1',
			id: 'folder1',
			collapsed: true,
			iconComponent: CustomIconFolder,
			iconComponentCollapsed: CustomIconFolderCollapsed
		},
		folder2: {
			type: 'folder',
			name: 'Folder 2',
			id: 'folder2',
			children: ['folder2a', 'folder2b', 'file']
		},
		folder2a: { type: 'folder', name: 'Folder 2a', id: 'folder2a' },
		folder2b: { type: 'folder', name: 'Folder 2b', id: 'folder2b' },
		file: { type: 'file', name: 'codument.docx', id: 'file', iconComponent: CustomIconFile }
	}
</script>

<TreeView tree={tree} />
```

## To be implemented

- animation
- drag-and-drop
