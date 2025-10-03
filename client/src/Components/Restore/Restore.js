import React, { useState, useEffect } from "react";
import "./Restore.css";
import Table from "react-bootstrap/esm/Table";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbarr from "../Navbarr/Navbarr";
import { REACT_APP_BACKEND_SERVER_URL } from "../../config";

const Restore = () => {
  const navigate = useNavigate();
  const [restoreProducts, setRestoreProducts] = useState([]);
 
  useEffect(() => {
    const fetchAllRestore = async () => {
      const response = await axios.get(
        `${REACT_APP_BACKEND_SERVER_URL}/api/v1/restore`
      );
      
    };
  }, []);
  return (
    <>
      <div className="background">
        <Navbarr />
        <br></br>
        <div className="restoreBtnContainer">
          <button
            className="restoreBtn"
            onClick={() =>navigate('/restore/newRestore')}
          >
            Add New Restore
          </button>
        </div>

        <div className="tab-container">
          <Table striped bordered hover className="tab">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Created at</th>
                <th>Restore Name </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3</td>
                <td>03/10/2025</td>
                <td>ThirdRestore</td>
                <td>
                  <button>View</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>03/10/2025</td>
                <td>SecondRestore</td>
                <td>
                  <button>View</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>03/10/2025</td>
                <td>FirstRestore</td>
                <td>
                  <button>View</button>
                  <button>Delete</button>
                </td>
              </tr>
               <tr>
                <td>1</td>
                <td>03/10/2025</td>
                <td>FirstRestore</td>
                <td>
                  <button>View</button>
                  <button>Delete</button>
                </td>
              </tr>
               <tr>
                <td>1</td>
                <td>03/10/2025</td>
                <td>FirstRestore</td>
                <td>
                  <button>View</button>
                  <button>Delete</button>
                </td>
              </tr>
               <tr>
                <td>1</td>
                <td>03/10/2025</td>
                <td>FirstRestore</td>
                <td>
                  <button>View</button>
                  <button>Delete</button>
                </td>
              </tr>
               <tr>
                <td>1</td>
                <td>03/10/2025</td>
                <td>FirstRestore</td>
                <td>
                  <button>View</button>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Restore;
