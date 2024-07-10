import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Pagination,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_AI_PLANS } from "../utils/queries";
import Auth from "../utils/auth"

function SavedPlansComponent() {
    const token = Auth.getToken()
    const { _id } = Auth.getProfile(token).data
    const { loading, error, data } = useQuery(GET_AI_PLANS, {
        variables: { userId: _id }, 
    });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 

  if (loading) return <CircularProgress />;
  if (error) return <p>Error :(</p>;

  // Calculate the current plans to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlans = data.aiPlans.slice(indexOfFirstItem, indexOfLastItem);

  // Change page handler
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        className="mt-5 pt-5"
        direction="column"
      >
        {currentPlans.map((plan) => (
          <Grid item key={plan.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {plan.title}
                </Typography>
                <Typography color="textSecondary">
                  {plan.plan}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(data.aiPlans.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        showFirstButton
        showLastButton
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </>
  );
}

export default SavedPlansComponent;
