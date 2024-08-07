import type { Get_TreeQuery } from "../__generated__/graphql";

export type TreeNode = {
  label: string;
  value: string;
  sort?: number;
  children?: TreeNode[];
};

export const sortNodes = (nodes: TreeNode[]): TreeNode[] => {
  return nodes
    .sort((a, b) => (a.sort || 0) - (b.sort || 0))
    .map((node) => {
      if (node.children) {
        node.children = sortNodes(node.children);
      }
      return node;
    });
};

export const generateTreeData = (
  data: Get_TreeQuery | undefined
): TreeNode[] => {
  const treeData: TreeNode[] = [];

  if (data?.modelTreeClasses?.tree) {
    for (const tree of data.modelTreeClasses.tree) {
      if (tree) {
        const treeNode: TreeNode = {
          label: tree.name,
          value: `tree-${tree.id}:${tree.description}`,
          sort: tree.sort,
          children: tree.classTypes?.map((classType) => ({
            label: classType.name,
            value: `classType-${tree.id}-${classType.id}:${classType.description}`,
            sort: classType.sort,
          })),
        };

        treeData.push(treeNode);
      }
    }
  }

  return sortNodes(treeData);
};

export const filterTree = (data: TreeNode[], searchQuery: string) => {
  const filteredData: TreeNode[] = [];

  function traverse(node: TreeNode) {
    const newNode = { ...node };

    if (node.children) {
      newNode.children = node.children.filter((child) => {
        const filteredChild = traverse(child);
        return filteredChild !== null;
      });
    }

    if (
      newNode.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (newNode.children && newNode.children.length > 0)
    ) {
      return newNode;
    }
    return null;
  }

  for (const node of data) {
    const filteredNode = traverse(node);
    if (filteredNode !== null) {
      filteredData.push(filteredNode);
    }
  }

  return filteredData;
};
