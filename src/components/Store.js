import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { Switch, Link, Route } from "react-router-dom";

import Product from "./Product";

import {
	store_toggle_edit_product,
	store_add_product,
	store_edit_product,
	store_confirm_edit,
	store_increment_product,
	store_decrement_product,
	store_delete_product,
	store_add_product_to_cart,
	store_remove_product_to_cart,
	store_valid_cart,
} from "../services/store/actions";

function formatPrice(cents) {
  return `${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`;
}

class Store extends Component {

	state = {
		text:"",
		product: {
			name: "",
			image: "",
			price: "",
			desc: ""
		}
	}

	constructor(props) {
		super(props);
		this.changeProductField = this._changeProductField.bind(this);
	}

	_changeProductField(field, value) {
		var {product} = this.state;
		product[field] = value;
		this.setState({
			product
		});
	}

	render() {

		const order = [];
		let finalPrice = 0;

		this.props.store.cart.map((item) => {
			var indexItem = this.props.store.items.findIndex((obj) => item == obj.id);
			if (indexItem > -1) {
				var product = this.props.store.items[indexItem];
				var orderIndex = order.findIndex((obj) => item == obj.id);
				var exists = orderIndex > -1;
				if (!exists) {
					order.push(
						{
							id: item,
							price: parseInt(product.price),
							quantity: 1
						}
					);
				} else {
					order[orderIndex].quantity++;
				}
				finalPrice += parseInt(product.price);
			}
		});


		return (
			<div
				className="content"
			>
				<div className="store">
					
					<div className="store_title"><h1>En stock : </h1></div>
					{
						this.props.store.items.map((item) => {
							return (
								<Product
									key={item.id}
									{...item}
									onAdd={() => this.props.store_add_product_to_cart(item)}
								/>
							);
						})
					}
				</div>
				<div className="cart">
					<div className="store_title"><h1>Vos achats : </h1></div>
					<ul>
						{
							order.map((item, index) => {

								var indexItem = this.props.store.items.findIndex((obj) => item.id == obj.id);

								if (indexItem > -1) {
									var product = this.props.store.items[indexItem];
									return (
										<li
											key={index}
											style={{
												display: "flex",
												flex: 1,
												justifyContent: "space-between",
												width: "100%",
												paddingLeft: 15,
												paddingRight: 15,
											}}
										>
											<span ><h1>
											{
												product.name
											}</h1>
											</span>
											<span>
											<button 
												className='boutonPannier' onClick={() => this.props.store_remove_product_to_cart(product)}>
												-
											</button>
											{
												item.quantity
											}
											</span>
										</li>
									);
								}
							})
						}
					</ul>
					<div>
						{
							order.length > 0 ?
								<div
									style={{
										display: "flex",
										flex: 1,
										justifyContent: "center",
										width: "100%",
										paddingTop: 35,
										paddingLeft: 15,
										paddingRight: 15,
									}}
								>
									<div>
										Prix : { formatPrice(finalPrice) }
									</div>
									<div className='marginTop'>
									<button className='bouton'
										onClick={() => this.props.store_valid_cart()}
									>
										Valider
									</button>
									</div>
								</div>

							:
								null
						}
					</div>
				</div>
				<div className="inventory">
					<div className="store_title"><h1>Inventaire</h1></div>
					<Product
						edit
						add
						{
							...this.state.product
						}
						onAdd={() => {
							function isNumber(n) {
								return !isNaN(parseFloat(n)) && isFinite(n);
							}

							if (!isNumber(this.state.product.price)) {
								alert("Votre prix n'est pas correcte");
							} else {
								this.props.store_add_product(this.state.product);
								var {product} = this.state;
								product = {
									name: "",
									image: "",
									price: "",
									desc: ""
								};
								this.setState({
									product
								});
							}
						}}
						onChangeImage={(value) => this.changeProductField("image", value)}
						onChangeName={(value) => this.changeProductField("name", value)}
						onChangePrice={(value) => this.changeProductField("price", value)}
						onChangeDescription={(value) => this.changeProductField("desc", value)}
					/>
					<hr/>
					{
						this.props.store.items.map((item) => {

							var index = this.props.store.edits.findIndex((obj) => obj.id == item.id);

							var edition = {};

							if (index > -1) {
								edition = this.props.store.edits[index];
							}

							return (
								<Product
									key={item.id}
									{...item}
									{...edition}
									edit={index > -1}
									onEdit={() => this.props.store_toggle_edit_product(item)}
									onCancel={() => this.props.store_toggle_edit_product(item)}
									onAdd={() => {
										this.props.store_confirm_edit(item);
										this.props.store_toggle_edit_product(item);
									}}

									onIncrement={() => this.props.store_increment_product(item)}
									onDecrement={() => this.props.store_decrement_product(item)}

									onDelete={() => this.props.store_delete_product(item)}

									onChangeImage={(value) => this.props.store_edit_product({ id: item.id, field: "image", value: value})}
									onChangeName={(value) => this.props.store_edit_product({ id: item.id, field: "name", value: value})}
									onChangePrice={(value) => this.props.store_edit_product({ id: item.id, field: "price", value: value})}
									onChangeDescription={(value) => this.props.store_edit_product({ id: item.id, field: "desc", value: value})}

									editable
								/>
							);
						})
					}
				</div>
			</div>
		);
	}

}


const mapStateToProps = (state) => ({
	store: state.store,
});


const mapActionsToProps = (dispatch) => ({
	store_toggle_edit_product: bindActionCreators(store_toggle_edit_product, dispatch),
	store_add_product: bindActionCreators(store_add_product, dispatch),
	store_edit_product: bindActionCreators(store_edit_product, dispatch),
	store_confirm_edit: bindActionCreators(store_confirm_edit, dispatch),
	store_increment_product: bindActionCreators(store_increment_product, dispatch),
	store_decrement_product: bindActionCreators(store_decrement_product, dispatch),
	store_delete_product: bindActionCreators(store_delete_product, dispatch),
	store_add_product_to_cart: bindActionCreators(store_add_product_to_cart, dispatch),
	store_remove_product_to_cart: bindActionCreators(store_remove_product_to_cart, dispatch),
	store_valid_cart: bindActionCreators(store_valid_cart, dispatch),
	store_remove_product_to_cart: bindActionCreators(store_remove_product_to_cart, dispatch),
});


export default connect(mapStateToProps, mapActionsToProps)( Store );