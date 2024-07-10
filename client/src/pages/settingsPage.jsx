import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SettingsPage = () => {
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        // Call the API to delete the profile
        fetch('/api/deleteProfile', { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    // Handle successful deletion (e.g., redirect to login page)
                    console.log('Profile deleted');
                } else {
                    // Handle errors
                    console.error('Failed to delete profile');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setOpen(false);
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            textAlign="center"
            bgcolor="#fafafa"
            p={{ xs: 2, sm: 4, md: 6 }}
        >
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ padding: { xs: 2, sm: 4, md: 6 }, margin: '0 auto' }}>
                    <Typography variant="h2" component="header" gutterBottom>
                        Settings
                    </Typography>
                    <Box component="main" sx={{ width: '100%' }}>
                        <Box mb={4}>
                            <Typography variant="h4" component="h2" gutterBottom>
                                Profile Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        variant="outlined"
                                        defaultValue="John"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        variant="outlined"
                                        defaultValue="Doe"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        defaultValue="john.doe@example.com"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        variant="outlined"
                                        defaultValue="+1234567890"
                                    />
                                </Grid>
                            </Grid>
                            <Box mt={2}>
                                <Button variant="contained" color="primary">
                                    Update Profile
                                </Button>
                            </Box>
                        </Box>
                        <Box mb={4}>
                            <Typography variant="h4" component="h2" gutterBottom>
                                Change Password
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Current Password"
                                        type={showPassword ? "text" : "password"}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="New Password"
                                        type={showNewPassword ? "text" : "password"}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowNewPassword}
                                                        edge="end"
                                                    >
                                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Confirm New Password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                        edge="end"
                                                    >
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Box mt={2}>
                                <Button variant="contained" color="primary">
                                    Change Password
                                </Button>
                            </Box>
                        </Box>
                        <Box mb={4}>
                            <Typography variant="h4" component="h2" gutterBottom>
                                Delete Account
                            </Typography>
                            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                                Delete Account
                            </Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to delete your account? This action cannot be undone.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleDelete} color="secondary" autoFocus>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default SettingsPage;
