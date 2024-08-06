import {
  Button,
  Checkbox,
  Group,
  Input,
  Popover,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  setToken: (token: string | null) => void;
}

export const DashboardHeader = ({ search, setSearch, setToken }: Props) => {
  return (
    <Group justify="space-between" mt="4rem">
      <Group>
        <Text fz="xl">Классы</Text>
        <Button
          variant="outline"
          size="compact-xs"
          onClick={() => {
            setToken(null);
            localStorage.removeItem("token");
          }}
        >
          Выйти
        </Button>
      </Group>
      <Group>
        <Popover
          width={200}
          position="bottom"
          withArrow
          shadow="md"
          keepMounted
        >
          <Popover.Target>
            <Input
              component="button"
              pointer
              w={200}
              rightSection={<IconChevronDown size="16" />}
              styles={{ input: { backgroundColor: "#fbfbfb" } }}
            >
              Присвоенные
            </Input>
          </Popover.Target>
          <Popover.Dropdown bg="#fbfbfb">
            <Stack>
              <Checkbox label="Да" />
              <Checkbox label="Нет" />
            </Stack>
          </Popover.Dropdown>
        </Popover>
        <Popover
          width={200}
          position="bottom"
          withArrow
          shadow="md"
          keepMounted
        >
          <Popover.Target>
            <Input
              component="button"
              pointer
              w={200}
              rightSection={<IconChevronDown size="16" />}
              styles={{ input: { backgroundColor: "#fbfbfb" } }}
            >
              В Библиотеке
            </Input>
          </Popover.Target>
          <Popover.Dropdown bg="#fbfbfb">
            <Stack>
              <Checkbox label="Да" />
              <Checkbox label="Нет" />
            </Stack>
          </Popover.Dropdown>
        </Popover>
        <TextInput
          placeholder="Найти классы"
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          styles={{ input: { backgroundColor: "#fbfbfb" } }}
        />
      </Group>
    </Group>
  );
};
