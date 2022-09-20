import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setOneBrand } from '../redux/slice/BrandSlice';
import { setOneType } from '../redux/slice/TypeSlice';
import { SHOP_ROUTE } from '../utils/constant';

const Grid = () => {
  const dispatch = useAppDispatch();
  const { brands } = useAppSelector((store) => store.brands);
  const { types } = useAppSelector((store) => store.types);

  const linkToCategory = (brand: string, type: string) => {
    const filterType = types.filter((item) => item.name.toLowerCase() === type.toLowerCase()),
      filterBrand = brands.filter((item) => item.name.toLowerCase() === brand.toLowerCase());

    dispatch(setOneBrand(filterBrand[0].id));
    dispatch(setOneType(filterType[0].id));
  };

  return (
    <div className="grid">
      <Link to={SHOP_ROUTE} className="d-flex justify-center">
        <img
          src="/iPhone_home_page.png"
          alt="iPhone"
          className="grid__img"
          onClick={() => linkToCategory('Apple', 'Mobile')}
        />
      </Link>
      <Link to={SHOP_ROUTE} className="d-flex justify-center">
        <img
          src="/macbook_home_page.png"
          alt="macbook"
          className="grid__img"
          onClick={() => linkToCategory('Apple', 'laptop')}
        />
      </Link>
      <Link to={SHOP_ROUTE} className="d-flex justify-center">
        <img
          src="/AirPods.png"
          alt="AirPods"
          className="grid__img"
          onClick={() => linkToCategory('Apple', '')}
        />
      </Link>
      <Link to={SHOP_ROUTE} className="d-flex justify-center">
        <img
          src="/Apple-Watch.png"
          alt="watch"
          className="grid__img"
          onClick={() => linkToCategory('Apple', 'watch')}
        />
      </Link>
      <Link to={SHOP_ROUTE} className="d-flex justify-center">
        <img
          src="/xiaomi_home_page.png"
          alt="xiaomi"
          className="grid__img"
          onClick={() => linkToCategory('Xiaomi', 'mobile')}
        />
      </Link>
      <Link to={SHOP_ROUTE} className="d-flex justify-center">
        <img
          src="/samsung_home_page_2.png"
          alt="Samsung"
          className="grid__img"
          onClick={() => linkToCategory('Samsung', 'Mobile')}
        />
      </Link>
    </div>
  );
};

export default Grid;
