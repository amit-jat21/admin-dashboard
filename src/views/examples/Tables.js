import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';


const Tables = () => {
  const [cookie,setCookie] = useCookies(["token"]);
  const [tableData,setTableData]=useState([]);
  const[uId,setUid]=useState("");
  const api="http://localhost:8080/customer/show";
  useEffect(async()=>{
    const res=await fetch(api);
    const data=await res.json();
    setTableData(data);
    setUid(Cookies.get("data"));
    console.log(Cookies.get("data"));
   
  },[])
  useEffect(()=>{
    const cData=tableData.filter((data)=>{
      return data.User===uId
    });
    console.log("ggg",cData)
  },[tableData])
  return (
    <>
   {/*  */}
      {/* Page content */}
      <Container className="mt-7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              {/* <CardHeader className="border-0">
                <h3 className="mb-0">Card tables</h3>
              </CardHeader> */}
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">City</th>
                    <th scope="col">Customer Id</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tableData.map((data,key)=>{
                    return (
                      <>
                      <tr key={key}>
                        <td>{data.name}</td>
                      </tr>
                      </>
                    )
                    })
                  }
                </tbody>
              </Table>
              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
