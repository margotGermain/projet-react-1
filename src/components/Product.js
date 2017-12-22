import React, { Component } from 'react';


function formatPrice(cents) {
  return `${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`;
}

const ProductRender = (props) => (
	<li className="menu-produit">
		<img src={props.image} alt={props.name} />
		<h2 className="produit-name">
			{
				props.name
			}
		</h2>
			<span className='price'>{formatPrice(props.price)}</span>
			<span className='price'>{props.quantity}</span>
		
		<p className='description'>{props.desc}</p>
		{
			props.quantity > 0 && !props.editable ?
				<button onClick={props.onAdd}>Ajouter</button>
			:
				null
		}
		{
			props.editable ?
				<button  className='boutonInventaire' onClick={props.onEdit}>Modifier</button>
			:
				null
		}
		{
			props.editable ?
				<span>
					<button 
						className='marginLeft'
						onClick={props.onDecrement}
					>
						Retirer
					</button>
					<button
						
						onClick={props.onIncrement}
					>
						Rajouter
					</button>
				</span>
			:
				null
		}
		{
			props.editable ?
				<button className='boutonInventaire' onClick={props.onDelete}>Supprimer</button>
			:
				null
		}
	</li>
)

const styleEditableInput = {
	width: "100%",
	backgroundColor: "transparent"
}

const ProductEditable = (props) => (
	<div
		className="menu-produit"
		style={styleEditableInput}
	>     Ajouter un produit :
		<input class="champTexte2" placeholder=" Nom de l'article" style={styleEditableInput} type="text" value={props.name} onChange={(e) => props.onChangeName(e.target.value)}/><br/>
		<input class="champTexte2" placeholder=" Prix" style={styleEditableInput} type="text" value={props.price} onChange={(e) => props.onChangePrice(e.target.value)}/><br/>
		<input class="champTexte2" placeholder=" Description technique" style={styleEditableInput} type="text" value={props.desc} onChange={(e) => props.onChangeDescription(e.target.value)}/><br/>
		<input class="champTexte2" placeholder=" URL image" style={styleEditableInput} type="text" value={props.image} onChange={(e) => props.onChangeImage(e.target.value)}/><br/>
		{
			!props.add ?
				<button class="bouton" onClick={props.onCancel}>Annuler</button>
			:
				null
		}
		<div>
		<button className='boutonAjouter' onClick={props.onAdd}>{ props.add ? "Ajouter" : "Confirmer" }</button>
		</div>
	</div>
)


const Product = (props) => {
	if (props.edit) {
		return <ProductEditable {...props} />;
	}
	return <ProductRender {...props}/>
}

export default Product