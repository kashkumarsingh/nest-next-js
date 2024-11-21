import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Category } from "../../../types/category";

SwiperCore.use([Autoplay, Navigation]);

interface CategorySliderProps {
  categories: Category[];  // Directly use the Category type from your types
  loading: boolean;
  error: string | null;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ categories, loading, error }) => {
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!categories.length) return <p>No categories available.</p>;

  return (
    <>
      <Swiper
        autoplay={true}
        rewind={true}
        loop={true}
        navigation={{
          prevEl: ".custom_prev_ct1",
          nextEl: ".custom_next_ct1",
        }}
        className="custom-class"
        breakpoints={{
          480: {
            slidesPerView: 2
          },
          640: {
            slidesPerView: 3
          },
          768: {
            slidesPerView: 5
          },
          1024: {
            slidesPerView: 8
          },
          1200: {
            slidesPerView: 11
          }
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className={`card-2 ${category.bg || ''}`}> {/* handle optional bg */}
              <figure className="img-hover-scale overflow-hidden">
                {category.img ? (
                  <img
                    src={`/assets/imgs/shop/${category.img}`}
                    alt={category.title}
                    loading="lazy"
                  />
                ) : (
                  <span>No image available</span>  // Fallback for missing image
                )}
              </figure>
              <h6>{category.title}</h6>
              <span>
                {category.item_count !== null && category.item_count !== undefined
                  ? `${category.item_count} items` 
                  : "No Items"} {/* Fallback for missing item count */}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow"
        id="carausel-10-columns-arrows"
      >
        <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
          <i className="fi-rs-arrow-small-left"></i>
        </span>
        <span className="slider-btn slider-next slick-arrow custom_next_ct1">
          <i className="fi-rs-arrow-small-right"></i>
        </span>
      </div>
    </>
  );
};

export default CategorySlider;
