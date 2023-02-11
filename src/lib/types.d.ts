import type { ComponentType } from 'svelte';

export type TreeViewNodeType = 'container' | 'leaf';

export interface TreeViewNode {
	type: TreeViewNodeType;
	id: string;
	name: string;
	class?: string;
	iconComponent?: ComponentType;
	iconComponentCollapsed?: ComponentType;
	nameComponent?: ComponentType;
	collapsed?: boolean;
	children?: TreeViewNode[];
}
