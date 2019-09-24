import React from "react";

class Pagination extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentPage: null,
      pageCount: null
    };
  }

  componentDidMount(products) {
    const startingPage = this.props.startingPage ? this.props.startingPage : 1;
    const pageSize = this.props.pageSize;
    let pageCount = parseInt(products.length / pageSize);
    if (products.length % pageSize > 0) {
      pageCount++;
    }
    this.setState({
      currentPage: startingPage,
      pageCount: pageCount
    });
  }

  setCurrentPage(num) {
    this.setState({ currentPage: num });
  }

  createControls() {
    let controls = [];
    const pageCount = this.state.pageCount;
    for (let i = 1; i <= pageCount; i++) {
      const baseClassName = "pagination-controls__button";
      const activeClassName =
        i === this.state.currentPage ? `${baseClassName}--active` : "";
      controls.push(
        <div
          className={`${baseClassName} ${activeClassName}`}
          onClick={() => this.setCurrentPage(i)}
        >
          {i}
        </div>
      );
    }
    return controls;
  }

  createPaginatedData(products) {
    const pageSize = this.props.pageSize;
    const currentPage = this.state.currentPage;
    const upperLimit = currentPage * pageSize;
    const dataSlice = products.slice(upperLimit - pageSize, upperLimit);
    return dataSlice;
  }

  render() {
    return (
      <div className="pagination">
        <div className="pagination-controls">{this.createControls()}</div>
        <div className="pagination-results">
          {React.cloneElement(this.props.children, {
            data: this.createPaginatedData()
          })}
        </div>
      </div>
    );
  }
}

// Pagination.propTypes = {
//   data: React.PropTypes.array.isRequired,
//   pageSize: React.PropTypes.number.isRequired,
//   startingPage: React.PropTypes.number.isRequired
// };

Pagination.defaultProps = {
  pageSize: 20,
  startingPage: 1
};

export default Pagination;
