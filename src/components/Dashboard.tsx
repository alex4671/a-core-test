import { useQuery } from "@apollo/client";
import { Center, Container, Loader } from "@mantine/core";
import { useState } from "react";
import { gql } from "../__generated__/gql";
import { filterTree, generateTreeData } from "../utils/formatters";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardMain } from "./DashboardMain";

const GET_TREE = gql(`
  query Get_Tree {
    modelTreeClasses {
      tree {
        id
        name
        description
        sort
        classTypes {
          id
          name
          sort
          description
          standard
          code
        }
      }
    }
  }
`);

interface Props {
  setToken: (token: string | null) => void;
}

function Dashboard({ setToken }: Props) {
  const { loading, error, data } = useQuery(GET_TREE, {
    onError(error) {
      setToken(null);
      localStorage.removeItem("token");
      console.log("error", error);
    },
  });
  const [search, setSearch] = useState("");

  if (loading)
    return (
      <Center mt="6rem">
        <Loader size="xl" />
      </Center>
    );
  if (error) return <p>Error : {error.message}</p>;

  const formattedData = generateTreeData(data);
  const filteredData = filterTree(formattedData, search);

  return (
    <Container size={"lg"}>
      <DashboardHeader
        search={search}
        setSearch={setSearch}
        setToken={setToken}
      />
      <DashboardMain data={filteredData} />
    </Container>
  );
}

export default Dashboard;
