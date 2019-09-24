import React from "react";
import IconSwitch from "./IconSwitch";
import ShopCard from "./ShopCard";
import ShopItem from "./ShopItem";
import Loader from "./Loader";

import "./App.css";

const VIEW_LIST = "view_list";
const VIEW_MODULE = "view_module";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: VIEW_MODULE, isLoaded: false, products: Array };
    this.layout = props.layout;
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/photos", {
      method: "GET"
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ products: response });
        this.setState({ isLoaded: true });
      });
  }

  changeView() {
    this.state.view === VIEW_MODULE
      ? this.setState({ view: VIEW_LIST })
      : this.setState({ view: VIEW_MODULE });
  }

  getShopItems(products, cardView) {
    return products.map(product => {
      let cardProps = {
        title: product.title,
        caption: product.thumbnailUrl,
        img: product.url,
        price: `${product.id} руб.`
      };
      return cardView ? (
        <ShopCard {...cardProps} />
      ) : (
        <ShopItem {...cardProps} />
      );
    });
  }

  renderLayout(cardView) {
    if (cardView) {
      // console.log(this.products);
      if (!this.state.isLoaded) {
        return <Loader />;
      }
      return (
        <CardsView
          layout={this.layout}
          cards={this.getShopItems(this.state.products, cardView)}
        />
      );
    }
    return (
      <ListView items={this.getShopItems(this.state.products, cardView)} />
    );
  }

  render() {
    return (
      <div>
        <div className="toolbar">
          <IconSwitch
            icon={this.state.view}
            onSwitch={this.changeView.bind(this)}
          />
        </div>
        {this.renderLayout(this.state.view === VIEW_MODULE)}
      </div>
    );
  }
}

// -------------------------------------------

const CardsView = props => {
  const { layout, cards } = props;

  const getLayoutClasses = layout => {
    return Object.keys(layout)
      .map(key => `col-${key}-${layout[key]}`)
      .join(" ");
  };

  const layoutClasses = getLayoutClasses(layout);
  const renderCards = cards => {
    return cards.map((card, i) => {
      return (
        <div className={layoutClasses} key={`card-${i}`}>
          {card}
        </div>
      );
    });
  };

  return <div className="row">{renderCards(cards)}</div>;
};

const ListView = props => {
  const { items } = props;

  const renderItems = items => {
    return items.map((item, i) => {
      return (
        <li className="list-item" key={`li-${i}`}>
          {item}
        </li>
      );
    });
  };

  return <ul className="list">{renderItems(items)}</ul>;
};

export default App;
