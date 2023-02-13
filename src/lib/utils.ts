import type { Node, Tree } from './types';

export function isNodeDisabled(node: Node, tree: Tree) {
	let parentNode = tree[node.id];
	while (parentNode && !parentNode.disabled) {
		parentNode = tree[parentNode.parentNodeId];
	}

	if (!parentNode) return false;
	else return parentNode.disabled;
}
