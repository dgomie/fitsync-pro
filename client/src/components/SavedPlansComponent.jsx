import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Modal,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AI_PLANS } from "../utils/queries";
import { DELETE_AI_PLAN } from "../utils/mutations";
import Auth from "../utils/auth";
import { usePlans } from "../context/plans-context"; // Import the context

function SavedPlansComponent() {
  const token = Auth.getToken();
  const { _id } = Auth.getProfile(token).data;
  const { loading, error, data } = useQuery(GET_AI_PLANS, {
    variables: { userId: _id },
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [deleteAIplan] = useMutation(DELETE_AI_PLAN);
  const { plans, setPlans } = usePlans(); // Use the context
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlans = plans.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    if (data && data.aiPlans) {
      setPlans(data.aiPlans);
    }
  }, [data, setPlans]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error :(</p>;

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    setOpenModal(true);
  };

  const handleDeletePlan = () => {
    if (selectedPlan && selectedPlan._id) {
      deleteAIplan({ variables: { id: selectedPlan._id } })
        .then((response) => {
          console.log("Plan deleted successfully:", response);
          const deletedPlanId = response.data.deleteAIplan;
          const updatedPlans = plans.filter(
            (plan) => plan._id !== deletedPlanId
          );
          setPlans(updatedPlans);
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error deleting plan:", error);
        });
    } else {
      console.error("No plan selected or missing ID");
    }
  };

  const renderWorkoutPlan = (plan) => {
    const cleanedPlan = plan.replace(/^##/, "").trim();
    const sections = cleanedPlan.split("\n\n");
    return sections.map((section, index) => {
      const titleMatch = section.match(/^\*\*(.*)\*\*$/);
      if (titleMatch) {
        return (
          <Typography variant="h6" key={index} style={{ marginTop: "20px" }}>
            {titleMatch[1]}
          </Typography>
        );
      }
      const listMatch = section.match(/^\*\s(.*)$/gm);
      if (listMatch) {
        return (
          <ul key={index} style={{ marginLeft: "20px" }}>
            {listMatch.map((item, i) => (
              <li key={i}>{item.replace(/^\*\s/, "")}</li>
            ))}
          </ul>
        );
      }
      return (
        <Typography key={index} paragraph>
          {section}
        </Typography>
      );
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPlan(null);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "75vh",
    width: "80vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
  };

  return (
    <div className="mb-4">
      <Box
        container
        spacing={2}
        justifyContent="center"
        className="mt-5 pt-5"
        direction="column"
      >
        <Typography variant="h6" component="h2" align="center">
          Your Saved Workouts
        </Typography>
        {currentPlans.length > 0 ? (
          <>
          <div className="scroll-container">
            {currentPlans.map((plan) => (
              <Box item key={plan._id} onClick={() => handleOpenModal(plan)}>
                <Card className="cardHoverEffect plan-card">
                  <CardContent>
                    <Typography variant="body2" component="h2">
                      {plan.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </div>
           <div
           style={{
             display: "flex",
             justifyContent: "center",
             marginTop: "20px",
           }}
         >
           <Button onClick={handlePreviousPage} disabled={currentPage === 1} color="success">
             Previous
           </Button>
           <Button
             onClick={handleNextPage}
             disabled={currentPage === Math.ceil(plans.length / itemsPerPage)}
             color="success"
           >
             Next
           </Button>
         </div>
         </>

        ) : (
          <div
            className="scroll-container"
            style={{ justifyContent: "center", display: "flex" }}
          >
            <Typography variant="subtitle1" align="center">
              You have no saved Fit-AI workouts.
            </Typography>
          </div>
        )}
       
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {selectedPlan?.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedPlan?.plan ? renderWorkoutPlan(selectedPlan.plan) : null}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button variant="contained" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeletePlan}
            >
              Delete Plan
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default SavedPlansComponent;
