import React, { Component } from "react";
import Card from "./Card";

class Column extends Component {
  state = {};
  render() {
    return (
      <section className="col-md-3 h-100 p-3">
        <div className="bg-secondary h-100 rounded p-5 ">
          <button
            onClick={e => {
              // appel au click de la méthode addCard avec pour
              // paramètre l'evenement et la colonne concernée
              this.props.onClickAddCard(e, this.props.column);
            }}
            className="btn btn-success "
          >
            +
          </button>
          <h2 className="text-light">{this.props.column.name}</h2>
          {this.props.column.cards.map(card => {
            return (
              <Card
                key={card.id}
                onDeleteCard={this.props.onDeleteCard}
                onEditCard={this.props.onEditCard}
                card={card}
                column={this.props.column}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

export default Column;
