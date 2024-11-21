// components/CategoriesList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store'; // RootState for type inference
import { fetchCategoriesThunk } from '../redux/features/categories/categoryThunks';

const CategoriesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(fetchCategoriesThunk());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ul className='flex'>
            {categories.map((category) => (
                <li key={category.id}>
                    <div className={`card-2 ${category.bg}`}>
                        <figure className="img-hover-scale overflow-hidden">
                            <img
                                src={`/assets/imgs/shop/${category.img}`}
                                alt={category.title}
                                loading="lazy"
                            />
                        </figure>
                        <h6>{category.title}</h6>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CategoriesList;
