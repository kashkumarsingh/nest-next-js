import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategorySlider from './sliders/CategorySlider/CategorySlider'; // Import CategorySlider
import { RootState, AppDispatch } from '../redux/store';
import { fetchCategoriesThunk } from '../redux/features/categories/categoryThunks';

const HomeClient = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Access the categories, loading, and error state from Redux store
  const { categories, loading, error } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    // Dispatch the thunk to fetch categories when the component mounts
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  return (
    <section className="popular-categories section-padding">
      <div className="container wow animate__fadeIn animate__animated">
        <div className="section-title">
          <div className="title">
            <h3>Featured Categories</h3>
          </div>
        </div>
        <div className="carausel-10-columns-cover position-relative">
          <div className="carausel-10-columns" id="carausel-10-columns">
            <CategorySlider categories={categories} loading={loading} error={error} />
            {/* <CategoriesList/> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeClient;
