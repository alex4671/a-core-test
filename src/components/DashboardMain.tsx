import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Group,
  type RenderTreeNodePayload,
  Stack,
  Table,
  Text,
  Textarea,
  Tree,
  useTree,
} from "@mantine/core";
import { IconChevronDown, IconTemperatureCelsius } from "@tabler/icons-react";
import { useState } from "react";
import type { TreeNode } from "../utils/formatters";

const elements = [
  {
    name: "Давление номинильное",
    default: 2.5,
    unit: "МПа",
  },
  {
    name: "Пожаробезопасный",
    default: <Checkbox />,
    unit: null,
  },
  {
    name: "Температура среды",
    default: null,
    unit: <IconTemperatureCelsius size="16" />,
  },
  {
    name: "Функциональный признак прибора",
    default: "Т",
    unit: null,
  },
];

export const DashboardMain = ({ data }: { data: TreeNode[] }) => {
  const tree = useTree();
  const [selected, setSelected] = useState<string>("");

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td w={"50%"}>{element.name}</Table.Td>
      <Table.Td>{element.default}</Table.Td>
      <Table.Td>{element.unit}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Grid mt="xl">
      <Grid.Col span={4}>
        <Group mb="md">
          <Button
            onClick={() => tree.collapseAllNodes()}
            variant="outline"
            size="compact-sm"
          >
            Свернуть все
          </Button>
          <Button
            onClick={() => tree.expandAllNodes()}
            variant="outline"
            size="compact-sm"
          >
            Развернуть все
          </Button>
        </Group>
        {data.length ? (
          <Tree
            tree={tree}
            data={data}
            levelOffset={42}
            expandOnClick={false}
            renderNode={(props) => renderTreeNode({ ...props, setSelected })}
          />
        ) : (
          <Text>Ничего не найдено</Text>
        )}
      </Grid.Col>
      <Grid.Col span={8}>
        <Box>
          <Textarea
            label="Описание"
            rows={4}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            styles={{ input: { backgroundColor: "#fbfbfb" } }}
          />
          <Text mt="xl">Свойства</Text>
          <Table withRowBorders={false}>
            <Table.Thead>
              <Table.Tr
                style={{
                  borderBottom: "1px solid var(--mantine-color-gray-3)",
                }}
              >
                <Table.Th w={"50%"}>Название</Table.Th>
                <Table.Th>Значение по умолчанию</Table.Th>
                <Table.Th>Еденица измерения</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          <Divider />
          <Text mt="xl">Связи</Text>
          <Stack gap="sm" mt="sm">
            <Checkbox
              label={
                <Text fw="bold" fz="sm">
                  Название класса
                </Text>
              }
            />
            <Divider />
            <Checkbox label={<Text fz="sm">Механическое оборудование</Text>} />
            <Checkbox label={<Text fz="sm">Титул</Text>} />
            <Divider />
          </Stack>
        </Box>
      </Grid.Col>
    </Grid>
  );
};

interface RenderTreeNodeProps extends RenderTreeNodePayload {
  setSelected: (val: string) => void;
}

const renderTreeNode = ({
  node,
  expanded,
  hasChildren,
  elementProps,
  tree,
  setSelected,
}: RenderTreeNodeProps) => {
  const checked = tree.isNodeChecked(node.value);
  const indeterminate = tree.isNodeIndeterminate(node.value);

  const description = node.value.split(":")[1];

  return (
    <Group gap="xs" {...elementProps}>
      {hasChildren && (
        <IconChevronDown
          onClick={() => tree.toggleExpanded(node.value)}
          size={14}
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      )}
      <Group gap={5}>
        <Checkbox.Indicator
          checked={checked}
          indeterminate={indeterminate}
          onClick={() =>
            !checked ? tree.checkNode(node.value) : tree.uncheckNode(node.value)
          }
          size="xs"
        />
        <Text fz="lg" onClick={() => setSelected(description)}>
          {node.label}
        </Text>
      </Group>
    </Group>
  );
};
