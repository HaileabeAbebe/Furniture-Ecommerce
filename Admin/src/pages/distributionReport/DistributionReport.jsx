import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDistributionReport,
  getDistributionReport,
} from "../../redux/apiCalls";
import "./DistributionReport.css";

export default function DistributionReport() {
  const dispatch = useDispatch();
  const distributionReports = useSelector((state) => state.report.reports);

  useEffect(() => {
    getDistributionReport(dispatch);
  }, [dispatch]);

  // Check if distributionReports is empty or undefined
  if (!distributionReports || distributionReports.length === 0) {
    return <div>Loading...</div>; // or handle this case in your UI as needed
  }

  const handleDelete = (id) => {
    deleteDistributionReport(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    // Dynamically generate columns for each field in the DistributionReport model
    ...Object.keys(distributionReports[0]).map((fieldName) => ({
      field: fieldName,
      headerName: fieldName,
      width: 200,
      renderCell: (params) => {
        // Render cell content here
        return params.row[fieldName];
      },
    })),
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/distribution-report/" + params.row._id}>
              <button className="addProductButton">Edit</button>
            </Link>
            <DeleteOutline
              className="reportListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="newProduct">
      <div className="buttonContainer">
        <Link to="/new-distribution-report">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={distributionReports}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
        autoHeight
      />
    </div>
  );
}
