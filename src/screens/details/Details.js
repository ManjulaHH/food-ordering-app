import { Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Details.css';

const styles = theme => ({
    snackbar: {
        margin: theme.spacing.unit,
    },
    margin: {
        margin: theme.spacing.unit * -0.25,
    },
});

class Details extends Component {

    constructor() {
        super();
        this.state = {
            //Snackbar Message Item
            open: false,
            vertical: 'top',
            horizontal: 'center',
            cartNotificationMessage: '',
            cartItems: [],
            totalCartItemsValue: 0,
            // restaurantDetails: '',
            restaurantDetails: {
                "id": 1,
                "restaurantName": "Dominoz",
                "photoUrl": "https://b.zmtcdn.com/data/pictures/4/18528394/6c3590212b3700b1b160422fd8478287.jpg?output-format=webp",
                "userRating": 4.2,
                "avgPrice": 250,
                "numberUsersRated": 99,
                "address": {
                    "id": 1,
                    "flatBuilNo": "501/31 Mahalaxmi SRA CHS",
                    "locality": "Prabhadevi",
                    "city": "Mumbai",
                    "zipcode": "400015",
                    "state": {
                        "id": 21,
                        "stateName": "Maharashtra"
                    }
                },
                "categories": [
                    {
                        "id": 6,
                        "categoryName": "Chinese",
                        "items": [
                            {
                                "id": 27,
                                "itemName": "fried rice",
                                "price": 206,
                                "type": "Veg"
                            },
                            {
                                "id": 25,
                                "itemName": "chillie chowmine",
                                "price": 210,
                                "type": "Non-Veg"
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "categoryName": "Drinks",
                        "items": [
                            {
                                "id": 8,
                                "itemName": "hot chocolate",
                                "price": 250,
                                "type": "Veg"
                            },
                            {
                                "id": 6,
                                "itemName": "tea",
                                "price": 20,
                                "type": "Veg"
                            },
                            {
                                "id": 11,
                                "itemName": "coke",
                                "price": 100,
                                "type": "Veg"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "categoryName": "Indian",
                        "items": [
                            {
                                "id": 23,
                                "itemName": "butter paneer",
                                "price": 190,
                                "type": "Veg"
                            },
                            {
                                "id": 4,
                                "itemName": "chapati",
                                "price": 20,
                                "type": "Veg"
                            },
                            {
                                "id": 13,
                                "itemName": "pastry",
                                "price": 210,
                                "type": "Veg"
                            },
                            {
                                "id": 29,
                                "itemName": "veg biryani",
                                "price": 203,
                                "type": "Veg"
                            },
                            {
                                "id": 17,
                                "itemName": "naan",
                                "price": 30,
                                "type": "Veg"
                            },
                            {
                                "id": 30,
                                "itemName": "chicken biryani",
                                "price": 245,
                                "type": "Non-Veg"
                            },
                            {
                                "id": 21,
                                "itemName": "matar paneer",
                                "price": 270,
                                "type": "Veg"
                            },
                            {
                                "id": 15,
                                "itemName": "macroni",
                                "price": 130,
                                "type": "Veg"
                            }
                        ]
                    }
                ]
            }
        }
    }

    // componentWillMount() {
    //     {/**API to fetch restaurant Details*/ }
    //     let xhr = new XMLHttpRequest();
    //     let that = this;
    //     xhr.addEventListener("readystatechange", function () {
    //         if (this.readyState === 4) {
    //             that.setState({
    //                 restaurantDetails: JSON.parse(this.responseText)
    //             });
    //         }
    //     });
    //     {/**Extracted Dynamically passed restaurantId from params */ }
    //     xhr.open("GET", this.props.baseUrl + "restaurant/" + this.props.match.params.restaurantId);
    //     xhr.send();
    // }

    addMenuItemClickHandler = (item) => {
        //set new attribute quantity for the cart
        let newCartItems = this.state.cartItems;
        let itemAlreadyAdded = false;
        if (newCartItems != null) {
            for (var i = 0; i < newCartItems.length; i++) {
                if (newCartItems[i].id === item.id) {
                    item.quantity = item.quantity + 1;
                    item.totalPrice = item.quantity * item.price;
                    itemAlreadyAdded = true;
                    break;
                }
            }
        }
        if (!itemAlreadyAdded) {
            item.quantity = 1;
            item.totalPrice = item.quantity * item.price;
            newCartItems.push(item);
        }
        this.setState({ cartItems: newCartItems, open: true, cartNotificationMessage: 'Item added to cart!' });
        this.updateTotalCartItemsValue(true, item.price);
    };

    addCartItemClickHandler = (item) => {
        item.quantity = item.quantity + 1;
        this.setState({ open: true, cartNotificationMessage: 'Item quantity increased by 1!' });
        this.updateTotalCartItemsValue(true, item.price);
    };

    removeCartItemClickHandler = (item) => {
        let removeCartItems = this.state.cartItems;
        for (var i = 0; i < removeCartItems.length; i++) {
            if (removeCartItems[i].id === item.id) {
                if (item.quantity > 1) {
                    item.quantity = item.quantity - 1;
                    item.totalPrice = item.quantity * item.price;
                } else {
                    removeCartItems.splice(i, 1);
                    item.totalPrice = 0;
                }
            }
        }
        this.setState({ cartItems: removeCartItems, open: true, cartNotificationMessage: 'Item quantity decreased by 1!' });
        this.updateTotalCartItemsValue(false, item.price);
    };

    updateTotalCartItemsValue(isAdded, price) {
        let newTotalCartItemsValue = this.state.totalCartItemsValue;
        if (isAdded) {
            newTotalCartItemsValue = newTotalCartItemsValue + price;
        } else {
            newTotalCartItemsValue = newTotalCartItemsValue - price;
        }
        this.setState({ totalCartItemsValue: newTotalCartItemsValue });
    }

    onClickCheckoutButton = state => () => {
        this.setState({ open: true, ...state });
        this.props.history.push({
            pathname: '/checkout',
            orderSummary: this.state
        })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        let restaurantDetails = this.state.restaurantDetails;
        return (
            <div>
                <Header 
                showSearchBox={false}
                showCategories={false}
                />
                <div>
                    <div className="details-header-bg">
                        <span>
                            <img className="restaurant-image" src={restaurantDetails.photoUrl} alt="RestaurantImage" />
                        </span>
                        <span>
                            {/**For adjacent state fields need to wrap them in some parent component */}
                            <Typography gutterBottom variant="h5" component="h2">
                                {restaurantDetails.restaurantName}
                            </Typography>
                            <br />
                            <Typography>{restaurantDetails.address.locality}</Typography>
                            <br />
                            <Typography>
                                {restaurantDetails.categories.map(category => (
                                    <span key={"category" + category.id}>{category.categoryName}, </span>
                                ))}
                            </Typography>
                            <br />
                            <Typography>{restaurantDetails.userRating}</Typography>
                            <Typography>AVERAGE RATING BY <br />{restaurantDetails.numberUsersRated} USERS</Typography>
                        </span>
                        <span>
                            {restaurantDetails.avgPrice * 2} <br /> AVERAGE COST FOR <br />TWO PEOPLE
                        </span>
                    </div>
                    <div className="menu-cart-items">
                        <div className="menu-items">
                            {restaurantDetails.categories.map(category => (
                                <div key={"categoryItems" + category.id}>
                                    <h2 className="category-name">{category.categoryName}
                                        <Divider />
                                    </h2>
                                    {category.items.map(item => (
                                        <div key={"item" + item.id}>
                                            <span>{item.type == 'Veg' &&
                                                <i className="fa fa-stop-circle-o veg-item-color" aria-hidden="true"></i>}
                                                {item.type == 'Non-Veg' &&
                                                    <i className="fa fa-stop-circle-o non-veg-item-color" aria-hidden="true"></i>}
                                            </span>
                                            <span>{item.itemName}</span>
                                            <span>{item.price}</span>
                                            <span>
                                                <IconButton
                                                    key="close"
                                                    aria-label="Close"
                                                    color="inherit"
                                                    onClick={() => this.addMenuItemClickHandler(item)}>
                                                    <Add />
                                                </IconButton></span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="my-cart">
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <Badge badgeContent={this.state.cartItems.length} color="primary" classes={{ badge: classes.margin }}>
                                            <ShoppingCart />
                                        </Badge>
                                        My Cart
                                    </Typography>
                                    {this.state.cartItems.map(item => (
                                        <div key={"item" + item.id}>
                                            <span>{item.type == 'Veg' &&
                                                <i className="fa fa-stop-circle-o veg-item-color" aria-hidden="true"></i>}
                                                {item.type == 'Non-Veg' &&
                                                    <i className="fa fa-stop-circle-o non-veg-item-color" aria-hidden="true"></i>}
                                            </span>
                                            <span>{item.itemName}</span>
                                            <span>
                                                <IconButton
                                                    key="close"
                                                    aria-label="Close"
                                                    color="inherit"
                                                    onClick={() => this.removeCartItemClickHandler(item)}>
                                                    <Remove />
                                                </IconButton>
                                            </span>
                                            <span>{item.quantity}</span>
                                            <span>
                                                <IconButton
                                                    key="close"
                                                    aria-label="Close"
                                                    color="inherit"
                                                    onClick={() => this.addCartItemClickHandler(item)}>
                                                    <Add />
                                                </IconButton>
                                            </span>
                                            <span>{item.totalPrice}</span>
                                        </div>
                                    ))}
                                    TOTAL AMOUNT {this.state.totalCartItemsValue}
                                    <br />
                                    <Button variant="contained" color="primary"
                                        onClick={this.onClickCheckoutButton({ vertical: 'bottom', horizontal: 'left' })}>
                                        CHECKOUT
                                    </Button>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        ContentProps={{
                                            'aria-describedby': 'message-id',
                                        }}
                                        message={<span id="message-id">{this.state.cartNotificationMessage}</span>}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default withStyles(styles)(Details);