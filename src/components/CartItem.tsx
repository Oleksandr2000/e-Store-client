import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAppSelector } from '../hooks';
import { Link } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/constant';

interface CartItemProps {
  id: number;
  name: string;
  img: string;
  price: number;
  typeId: number;
  brandId: number;
  hit: boolean;
  sale: boolean;
  discount: number;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  img,
  price,
  typeId,
  brandId,
  hit,
  sale,
  discount,
}) => {
  const { brands } = useAppSelector((store) => store.brands);
  const { types } = useAppSelector((store) => store.types);

  return (
    <Card style={{ width: '18rem' }} className="mb-4 m-auto device__card position-relative">
      <Card.Img variant="top" src={`http://localhost:4444/${img}`} height={300} className="mt-5" />
      <Card.Body>
        <Card.Title style={{ height: '50px' }}>{name}</Card.Title>
        <Card.Text>{price}</Card.Text>
        <Card.Text>
          {brands
            .filter((brand) => brand.id === brandId)
            .map((brand) => (
              <button className="button p-1 m-1 button__filter">{brand.name}</button>
            ))}
          {types
            .filter((type) => type.id === typeId)
            .map((type) => (
              <button className="button p-1 m-1 button__filter">{type.name}</button>
            ))}
        </Card.Text>
        <Link to={`${DEVICE_ROUTE}/${id}`}>
          <Button variant="primary">Learn more</Button>
        </Link>
      </Card.Body>
      {sale && <div className="sale">Sale {discount}%</div>}
      {hit && <div className="hit">Hit</div>}
    </Card>
  );
};
export default CartItem;
