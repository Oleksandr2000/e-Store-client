import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOneBrand } from '../../redux/slice/BrandSlice';
import { setOneType } from '../../redux/slice/TypeSlice';
import { SHOP_ROUTE } from '../../utils/constant';
import { motion } from 'framer-motion';
import { BottomAnimation, LeftAnimation, RightAnimation, TopAnimation } from '../../animation';
import { Container } from 'react-bootstrap';

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
    <div className="container">
      <motion.section initial="hidden" whileInView="visible" viewport={{ amount: 0.2, once: true }}>
        <div className="grid">
          <motion.div custom={1} variants={LeftAnimation}>
            <Link to={SHOP_ROUTE} className="d-flex justify-center">
              <img
                src="/iPhone_home_page.png"
                alt="iPhone"
                className="grid__img"
                onClick={() => linkToCategory('Apple', 'Mobile')}
              />
            </Link>
          </motion.div>
          <motion.div custom={2} variants={TopAnimation}>
            <Link to={SHOP_ROUTE} className="d-flex justify-center">
              <img
                src="/macbook_home_page.png"
                alt="macbook"
                className="grid__img"
                onClick={() => linkToCategory('Apple', 'laptop')}
              />
            </Link>
          </motion.div>
          <motion.div custom={3} variants={RightAnimation}>
            <Link to={SHOP_ROUTE} className="d-flex justify-center">
              <img
                src="/AirPods.png"
                alt="AirPods"
                className="grid__img"
                onClick={() => linkToCategory('Apple', '')}
              />
            </Link>
          </motion.div>
          <motion.div custom={4} variants={LeftAnimation}>
            <Link to={SHOP_ROUTE} className="d-flex justify-center">
              <img
                src="/Apple-Watch.png"
                alt="watch"
                className="grid__img"
                onClick={() => linkToCategory('Apple', 'watch')}
              />
            </Link>
          </motion.div>
          <motion.div custom={5} variants={BottomAnimation}>
            <Link to={SHOP_ROUTE} className="d-flex justify-center">
              <img
                src="/xiaomi_home_page.png"
                alt="xiaomi"
                className="grid__img"
                onClick={() => linkToCategory('Xiaomi', 'mobile')}
              />
            </Link>
          </motion.div>
          <motion.div custom={6} variants={RightAnimation}>
            <Link to={SHOP_ROUTE} className="d-flex justify-center">
              <img
                src="/samsung_home_page_2.png"
                alt="Samsung"
                className="grid__img"
                onClick={() => linkToCategory('Samsung', 'Mobile')}
              />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Grid;
