import React, { Component } from 'react';
// import { Product, Order } from './data/entities';
// import { ProductList } from './ProductList';
import { dataStore } from './data/dataStore';
import { Connect, Provider } from 'react-redux';
import { HttpHandler } from './data/httpHandler';
import { addProduct } from './data/actionCreators';
import { ConnectedProductList } from './data/productListConnector';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { OrderDetails } from './OrderDetails';
import { Summary } from './Summary';

// let testData: Product[] = [1, 2, 3, 4, 5].map((num) => ({
//   id: num,
//   name: `Prod${num}`,
//   category: `Cat${num % 2}`,
//   description: `Product ${num}`,
//   price: 100,
// }));
interface Props {
  // no props required
}
// interface State {
//   order: Order;
// }
export default class App extends Component<Props> {
  private httpHandler = new HttpHandler();
  // constructor(props: Props) {
  //   super(props);
  //   this.state = {
  //     order: new Order(),
  //   };
  // }

  componentDidMount = () =>
    this.httpHandler.loadProducts((data) => {
      dataStore.dispatch(addProduct(...data));
    });

  submitCallback = (routeProps: RouteComponentProps) => {
    this.httpHandler.storeOrder(dataStore.getState().order, (id) =>
      routeProps.history.push(`/summary/${id}`),
    );
  };

  render = () => (
    <div className='App'>
      <Provider store={dataStore}>
        <BrowserRouter>
          <Switch>
            <Route path='/products' component={ConnectedProductList} />
            <Route
              path='/order'
              render={(props) => (
                <OrderDetails
                  {...props}
                  submitCallback={() => this.submitCallback(props)}
                />
              )}
            />
            <Route path='/summary/:id' component={Summary} />
            <Redirect to='/products' />
          </Switch>
        </BrowserRouter>
      </Provider>

      {/* <ProductList
        products={testData}
        categories={this.categories}
        order={this.state.order}
        addToOrder={this.addToOrder}
      /> */}
    </div>
  );
  // get categories(): string[] {
  //   return [...new Set(testData.map((p) => p.category))];
  // }
  // addToOrder = (product: Product, quantity: number) => {
  //   this.setState((state) => {
  //     state.order.addProduct(product, quantity);
  //     return state;
  //   });
  // };
}
