import { GridListTile } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import GridList from '@material-ui/core/GridList';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Checkout.css';
import CheckCircle from '@material-ui/icons/CheckCircle';

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    snackbar: {
        margin: theme.spacing.unit,
    },
    gridListMain: {
        transform: 'translateZ(0)',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

function getSteps() {
    return ['Delivery', 'Payment'];
}

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Checkout extends Component {

    constructor() {
        super();
        this.state = {
            activeStep: 0,
            value: 0,
            orderId: '',
            //Snackbar Message Item
            open: false,
            vertical: 'top',
            horizontal: 'center',
            placeOrderNotificationMessage: '',
            addresses: [
                {
                    "id": 4,
                    "flatBuilNo": "C-201, MHS CHS",
                    "locality": "Anpara",
                    "city": "Singrauli",
                    "zipcode": "231224",
                    "state": {
                        "id": 6,
                        "stateName": "Chandigarh"
                    }
                },
                {
                    "id": 5,
                    "flatBuilNo": "B-244, Kakri Colony",
                    "locality": "Kakri",
                    "city": "Dhanbad",
                    "zipcode": "231278",
                    "state": {
                        "id": 8,
                        "stateName": "Dadar and Nagar Haveli"
                    }
                }
            ],
            //New Address Fields
            flatRequired: "disp-none",
            flat: "",
            localityRequired: "disp-none",
            locality: "",
            cityRequired: "disp-none",
            city: "",
            stateRequired: "disp-none",
            states: [
                {
                    "id": 1,
                    "stateName": "Andaman and Nicobar Islands"
                },
                {
                    "id": 2,
                    "stateName": "Andhra Pradesh"
                },
                {
                    "id": 3,
                    "stateName": "Arunachal Pradesh"
                },
                {
                    "id": 4,
                    "stateName": "Assam"
                },
                {
                    "id": 5,
                    "stateName": "Bihar"
                },
            ],
            zipcodeRequired: "disp-none",
            zipcode: "",
            //Payment Step
            paymentOptions: [
                {
                    "id": 1,
                    "paymentName": "Paytm"
                },
                {
                    "id": 2,
                    "paymentName": "Food Card"
                },
                {
                    "id": 3,
                    "paymentName": "UPI"
                },
                {
                    "id": 4,
                    "paymentName": "COD"
                },
                {
                    "id": 5,
                    "paymentName": "Debit Card"
                },
                {
                    "id": 6,
                    "paymentName": "Credit Card"
                },
                {
                    "id": 7,
                    "paymentName": "Net Banking"
                }
            ],
            selectedPaymentOption: '',
        }
    }

    // componentWillMount() {
    //     {/**API to fetch existing stored addresses*/ }
    //     let xhrAddress = new XMLHttpRequest();
    //     let that = this;
    //     xhrAddress.addEventListener("readystatechange", function () {
    //         if (this.readyState === 4) {
    //             that.setState({
    //                 addresses: JSON.parse(this.responseText)
    //             });
    //         }
    //     });
    //     xhrAddress.open("GET", this.props.baseUrl + "address/user");
    //     xhrAddress.send();

    //     {/**API to fetch State Names*/ }
    //     let xhrState = new XMLHttpRequest();
    //     let that = this;
    //     xhrState.addEventListener("readystatechange", function () {
    //         if (this.readyState === 4) {
    //             that.setState({
    //                 addresses: JSON.parse(this.responseText)
    //             });
    //         }
    //     });
    //
    //     xhrState.open("GET", this.props.baseUrl + "states");
    //     xhrState.send();
    //


    //     {/**API to fetch payment options*/ }
    //     let xhrPayment = new XMLHttpRequest();
    //     let that = this;
    //     xhrPayment.addEventListener("readystatechange", function () {
    //         if (this.readyState === 4) {
    //             that.setState({
    //                 paymentOptions: JSON.parse(this.responseText)
    //             });
    //         }
    //     });
    //
    //     xhrPayment.open("GET", this.props.baseUrl + "payment");
    //     xhrPayment.send();
    // }

    inputFlatChangeHandler = (e) => {
        this.setState({ flat: e.target.value });
    }

    inputLocalityChangeHandler = (e) => {
        this.setState({ locality: e.target.value });
    }

    inputCityChangeHandler = (e) => {
        this.setState({ city: e.target.value });
    }

    inputStateChangeHandler = (e) => {
        this.setState({ state: e.target.value });
    }

    inputZipcodeChangeHandler = (e) => {
        this.setState({ zipcode: e.target.value });
    }

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    handlePaymentOptionChange = (e) => {
        this.setState({ selectedPaymentOption: e.target.value });
    };

    getStepContent = (step) => {
        const { classes } = this.props;
        switch (step) {
            case 0:
                return < div >
                    <div>
                        <AppBar position="static">
                            <Tabs value={this.state.value} onChange={this.handleTabChange}>
                                <Tab label="EXISTING ADDRESS" />
                                <Tab label="NEW ADDRESS" />
                            </Tabs>
                        </AppBar>
                        {this.state.value === 0 && <TabContainer>
                            <div className="existing-address-container">
                                <GridList cellHeight={"auto"} className={classes.gridListMain} cols={3}>
                                    {/**Check implementation of onClick for GridListTile. If we directly write method name then it executes immediately*/}
                                    {this.state.addresses.map(address => (
                                        <GridListTile>
                                            <Card key={address.id} className="address">
                                                <CardContent>
                                                    <div>
                                                        <Typography>
                                                            {address.flatBuilNo}
                                                        </Typography>
                                                        <Typography>
                                                            {address.locality}
                                                        </Typography>
                                                        <Typography>
                                                            {address.city}
                                                        </Typography>
                                                        <Typography>
                                                            {address.state.stateName}
                                                        </Typography>
                                                        <Typography>
                                                            {address.zipcode}
                                                        </Typography>
                                                        <CheckCircle />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </GridListTile>
                                    ))}
                                </GridList>
                                <span>There are no saved addresses! You can save an address using your ‘Profile’ menu option.</span>
                            </div>
                        </TabContainer>}
                        {this.state.value === 1 && <TabContainer>
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="flat">Flat / Building No.</InputLabel>
                                <Input id="flat" type="text" flat={this.state.flat} onChange={this.inputFlatChangeHandler} />
                                <FormHelperText className={this.state.flatRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="locality">Locality</InputLabel>
                                <Input id="locality" type="text" locality={this.state.locality} onChange={this.inputLocalityChangeHandler} />
                                <FormHelperText className={this.state.localityRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="city">City</InputLabel>
                                <Input id="city" type="text" city={this.state.city} onChange={this.inputCityChangeHandler} />
                                <FormHelperText className={this.state.cityRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="state">State</InputLabel>
                                <Select
                                    input={<Input id="select-multiple-checkbox-genre" />}
                                    value={this.state.states}
                                    onChange={this.inputStateChangeHandler}>
                                    {this.state.states.map(stateDetail => (
                                        <MenuItem key={stateDetail.id} value={stateDetail.stateName}>
                                            <ListItemText primary={stateDetail.stateName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText className={this.state.stateRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="zipcode">Zipcode</InputLabel>
                                <Input id="zipcode" type="text" zipcode={this.state.zipcode} onChange={this.inputZipcodeChangeHandler} />
                                <FormHelperText className={this.state.zipcodeRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>

                        </TabContainer>}
                    </div>
                </div >
            case 1:
                return <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Select Mode of Payment</FormLabel>
                    <RadioGroup
                        aria-label="ModeOfPayment"
                        name="modeOfPayment"
                        className={classes.group}
                        value={this.state.selectedPaymentOption}
                        onChange={this.handlePaymentOptionChange}>
                        {this.state.paymentOptions.map(paymentOption => (
                            <FormControlLabel value={paymentOption.id} control={<Radio />} label={paymentOption.paymentName} />
                        ))}
                    </RadioGroup>
                </FormControl>
            default:
                return 'Unknown step';
        }
    };

    /**
     * Vertical Stepper Functions
     */

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    /**
     * Summary Details Functions
     */
    placeOrderClickHandler = () => {
        {/**API to place Order*/ }
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    orderId: JSON.parse(this.responseText)
                });
            }
        });
        xhr.open("POST", this.props.baseUrl + "order");
        let orderData = null;
        xhr.send(orderData);
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const { vertical, horizontal, open } = this.state;
        return (
            <div>
                <Header />
                <div className="checkout-page-container">
                    <div className="delivery-payment-details">
                        <div className={classes.root}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((label, index) => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                            <StepContent>
                                                <Typography>{this.getStepContent(index)}</Typography>
                                                <div className={classes.actionsContainer}>
                                                    <div>
                                                        <Button
                                                            disabled={activeStep === 0}
                                                            onClick={this.handleBack}
                                                            className={classes.button}>
                                                            Back
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.handleNext}
                                                            className={classes.button}>
                                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </StepContent>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {activeStep === steps.length && (
                                <Paper square elevation={0} className={classes.resetContainer}>
                                    <Typography>View the summary and place your order now!</Typography>
                                    <Button onClick={this.handleReset} className={classes.button}>
                                        CHANGE
                        </Button>
                                </Paper>
                            )}
                        </div>
                    </div>
                    <div className="summary">
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Summary
                                </Typography>
                                {this.props.location.orderSummary.cartItems.map(item => (
                                    <div key={"item" + item.id}>
                                        <span>{item.type === 'Veg' &&
                                            <i className="fa fa-stop-circle-o veg-item-color" aria-hidden="true"></i>}
                                            {item.type === 'Non-Veg' &&
                                                <i className="fa fa-stop-circle-o non-veg-item-color" aria-hidden="true"></i>}
                                        </span>
                                        <span>{item.itemName}</span>
                                        <span>{item.quantity}</span>
                                        <span>{item.totalPrice}</span>
                                    </div>
                                ))}
                                <br />
                                <Divider />
                                <br />
                                Net Amount {this.props.location.orderSummary.totalCartItemsValue}
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.placeOrderClickHandler}>PLACE ORDER</Button>
                                <Snackbar
                                    anchorOrigin={{ vertical, horizontal }}
                                    open={open}
                                    onClose={this.handleClose}
                                    ContentProps={{
                                        'aria-describedby': 'message-id',
                                    }}
                                    message={<span id="message-id">{this.state.placeOrderNotificationMessage}</span>}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Checkout.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Checkout);