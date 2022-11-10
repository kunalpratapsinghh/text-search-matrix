import { Box, Button, Heading, Input, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import GridItem from "./GridItem";
const Grid = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [gridInput, setGridInput] = useState({ rows: "", columns: "" });
  const [textSearch, setTextSearch] = useState("");
  const [show,setshow]=useState(false)

  function handleInput(e) {
    const { name, value } = e.target;
    setGridInput({
      ...gridInput,
      [name]: value,
    });
  }

  function creategrid(r, c) {
    r = Number(r);
    c = Number(c);
    let arr = [];
    let count = 0;

    for (let i = 0; i < r; i++) {
      let x = [];
      for (let j = 0; j < c; j++) {
        count++;
        let obj = { id: uuid(), name: count, match: false };
        x.push(obj);
      }
      arr.push(x);
    }
    setData(arr);
    setData1(JSON.parse(JSON.stringify(arr)));
    setshow(true)
  }

  const handleinput = (name, id) => {
    let newarr = data.map((el) => {
      return el.map((elem) =>
        elem.id === id ? { ...elem, name: name } : elem
      );
    });
    setData1(newarr);
    setData(newarr);
  };

  function handleTextsearch(n, m, textSearch, matrix) {
    var count = 0;
    console.log(matrix);
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < m; j++) {
        var sum = "";
        if (j < m - (textSearch.length - 1)) {
          for (let x = 0; x < textSearch.length; x++) {
            sum = sum + matrix[i][j + x].name;
          }
          //   console.log(sum,textSearch)
          if (sum == textSearch) {
            for (let x = 0; x < textSearch.length; x++) {
              let id = matrix[i][j + x].id;

              matrix = matrix.map((el) => {
                return el.map((elem) =>
                  elem.id === id ? { ...elem, match: true } : elem
                );
              });
            }
            count++;
          }
        }

        sum = "";
        if (i < n - (textSearch.length - 1)) {
          for (let x = 0; x < textSearch.length; x++) {
            sum = sum + matrix[i + x][j].name;
          }
          //   console.log(sum,textSearch)
          if (sum == textSearch) {
            for (let x = 0; x < textSearch.length; x++) {
              let id = matrix[i + x][j].id;

              matrix = matrix.map((el) => {
                return el.map((elem) =>
                  elem.id === id ? { ...elem, match: true } : elem
                );
              });
            }
            count++;
          }
        }

        sum = "";
        if (
          i < n - (textSearch.length - 1) &&
          j < m - (textSearch.length - 1)
        ) {
          for (let x = 0; x < textSearch.length; x++) {
            sum = sum + matrix[i + x][j + x].name;
          }
          //   console.log(sum,textSearch)
          if (sum == textSearch) {
            for (let x = 0; x < textSearch.length; x++) {
              let id = matrix[i + x][j + x].id;

              matrix = matrix.map((el) => {
                return el.map((elem) =>
                  elem.id === id ? { ...elem, match: true } : elem
                );
              });
            }
            count++;
          }
        }
        sum = "";
        if (i >= textSearch.length - 1 && j < m - (textSearch.length - 1)) {
          for (let x = 0; x < textSearch.length; x++) {
            sum = sum + matrix[i - x][j + x].name;
          }
          //   console.log(sum,textSearch)
          if (sum == textSearch) {
            for (let x = 0; x < textSearch.length; x++) {
              let id = matrix[i - x][j + x].id;

              matrix = matrix.map((el) => {
                return el.map((elem) =>
                  elem.id === id ? { ...elem, match: true } : elem
                );
              });
            }
            count++;
          }
        }
      }
    }

    setData(matrix);
    console.log(count);
  }

  return (
    <Box>
      <Box>
        <Input
          onChange={handleInput}
          type="number"
          name="rows"
          value={gridInput.rows}
          placeholder="Type Number of Rows"
          width={"300px"}
        ></Input>
        <Input
          onChange={handleInput}
          type="number"
          name="columns"
          value={gridInput.columns}
          placeholder="Type Number of Columns"
          width={"300px"}
        ></Input>
        <Button onClick={() => creategrid(gridInput.rows, gridInput.columns)}>
          Create Grid
        </Button>
      </Box>
      <Box>
        <Input
          placeholder="TextSearch"
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          width={"300px"}
        ></Input>
        <Button
          onClick={() =>
            handleTextsearch(
              gridInput.rows,
              gridInput.columns,
              textSearch,
              data1
            )
          }
        >
          TextSearch
        </Button>
      </Box>
      {show?<Box>
        <Heading fontSize={"20px"}> click on cell to edit Text</Heading>
        <Heading fontSize={"20px"} display="flex" justifyContent={"center"}><Text color={"red"}>Note:</Text> Each cell should have single Element</Heading>
      </Box>:""}

      <SimpleGrid
        columns={gridInput.columns}
        gap="1"
        width={gridInput.columns * 52}
        m="auto"
        mt={"100px"}
      >
        {data.map((el) => {
          return el.map((elem) => {
            return (
              <GridItem key={elem.id} elem={elem} handleinput={handleinput} />
            );
          });
        })}
      </SimpleGrid>
    </Box>
  );
};
export default Grid;
