import type { ComponentType } from 'svelte';

export type TreeNodeType = 'container' | 'leaf';

export interface Node {
	id: string;
	parentNodeId?: string;
	name: string;
	type: TreeNodeType;
	class?: string;
	iconComponent?: ComponentType;
	iconComponentCollapsed?: ComponentType;
	nameComponent?: ComponentType;
	collapsed?: boolean;
	disabled?: boolean;
	children?: string[];
}

export interface Tree {
	children: string[];
	[id: string]: TreeNode;
}
