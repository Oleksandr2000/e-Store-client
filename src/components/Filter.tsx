import React from 'react';
import { Brand, setActiveBrand } from '../redux/slice/BrandSlice';
import { Type, setActiveType } from '../redux/slice/TypeSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setActivePage } from '../redux/slice/DeviceSlice';

const Filter = () => {
  const dispatch = useAppDispatch();
  const { brands, activeBrands } = useAppSelector((store) => store.brands);
  const { types, activeType } = useAppSelector((store) => store.types);

  const addABrandFilter = (i: number) => {
    dispatch(setActivePage(1));

    dispatch(setActiveBrand(i));
  };

  const addATypeFilter = (i: number) => {
    dispatch(setActivePage(1));

    dispatch(setActiveType(i));
  };

  return (
    <>
      <div>
        <div className="filter__item mb-4">
          {brands.map((brand: Brand) => (
            <div className="filter__checkbox" onClick={() => addABrandFilter(brand.id)}>
              <div key={brand.id} className="filter__title">
                {brand.name}
              </div>
              <button className={activeBrands.includes(brand.id) ? 'checkbox-active' : 'checkbox'}>
                <span>✓</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="filter__item-last mb-4">
          {types.map((type: Type) => (
            <div className="filter__checkbox" onClick={() => addATypeFilter(type.id)}>
              <div key={type.id} className="filter__title">
                {type.name}
              </div>
              <button className={activeType.includes(type.id) ? 'checkbox-active' : 'checkbox'}>
                <span>✓</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Filter;
