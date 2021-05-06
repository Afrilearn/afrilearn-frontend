import React from "react";
import Workbook from "react-excel-workbook";

const data1 = [
  {
    foo: "123",
    bar: "456",
    baz: "789",
  },
  {
    foo: "abc",
    bar: "dfg",
    baz: "hij",
  },
  {
    foo: "aaa",
    bar: "bbb",
    baz: "ccc",
  },
];

const data2 = [
  {
    aaa: 1,
    bbb: 2,
    ccc: 3,
  },
  {
    aaa: 4,
    bbb: 5,
    ccc: 6,
  },
];
const TestXSL = () => {
  return (
    <div>
      <div className="row text-center" style={{ marginTop: "100px" }}>
        <Workbook
          filename="example.xlsx"
          element={<button className="btn btn-lg btn-primary">Try me!</button>}
        >
          <Workbook.Sheet data={data1} name="Sheet A">
            <Workbook.Column label="Foo" value="foo" />
            <Workbook.Column label="Bar" value="bar" />
            <Workbook.Column label="Baz" value="baz" />
          </Workbook.Sheet>
        </Workbook>
      </div>
    </div>
  );
};

export default TestXSL;
