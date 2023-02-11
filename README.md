# svelte-treeview-dnd

Simple and easy-to-use JSON-based treeview component with custom icon, controlled & uncontrolled modes support.

## Install the package

```bash
npm i svelte-treeview-dnd
```

## Usage

- Basic usage

```bash
<script lang="ts">
    import { TreeView, type TreeViewNode } from 'svelte-treeview-dnd';

    const treeNodes: TreeViewNode[] = [
        { type: 'folder', name: 'Folder 1', id: 'folder1', collapsed: true },
		{
			type: 'folder',
			name: 'Folder 2',
			id: 'folder2',
			children: [
				{ type: 'folder', name: 'Folder 2a', id: 'folder2a' },
				{ type: 'folder', name: 'Folder 2b', id: 'folder2b' },
				{ type: 'folder', name: 'Folder 2c', id: 'folder2c' }
			]
		}
    ]
</script>

<TreeView nodes={treeNodes} />
```

- Custom icons

```bash
<script lang="ts">
    import { TreeView, type TreeViewNode } from 'svelte-treeview-dnd';

	import CustomIconFolder from '$lib/components/CustomIconFolder.svelte'
	import CustomIconFolderCollapsed from '$lib/components/CustomIconFolderCollapsed.svelte'
	import CustomIconFile from '$lib/components/CustomIconFile.svelte'

    const treeNodes: TreeViewNode[] = [
        {
			type: 'folder',
			name: 'Folder 1',
			id: 'folder1',
			collapsed: true,
			iconComponent: CustomIconFolder,
			iconCompiconComponentCollapsedonent: CustomIconFolderCollapsed
		},
		{
			type: 'folder',
			name: 'Folder 2',
			id: 'folder2',
			children: [
				{ type: 'folder', name: 'Folder 2a', id: 'folder2a' },
				{ type: 'folder', name: 'Folder 2b', id: 'folder2b' },
				{ type: 'file', name: 'codument.docx', id: 'file', iconComponent: CustomIconFile }
			]
		}
    ]
</script>

<TreeView nodes={treeNodes} />
```

## To be implemented

- disabling items
- animation
- drag-and-drop
