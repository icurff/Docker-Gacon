import { Carousel } from "flowbite-react";
import { BookPanel } from "../components/BookPanel";
import { MyNavbar } from "../components/MyNavbar";
import { MyFooter } from "../components/MyFooter";
import { useFetchBooks } from "../customHooks/Book/useFetchBooks";
import { MySection } from "../components/MySection";

export function HomePage() {
  const { data: newBooks } = useFetchBooks(1, "All", "All", "");
  const { data: eduBooks } = useFetchBooks(1, "Education", "All", "");
  const { data: childBooks } = useFetchBooks(1, "Children", "All", "");
  const newBooksData = newBooks?.data || [];
  const eduBooksData = eduBooks?.data || [];
  const childBooksData = childBooks?.data || [];

  const customCarouselTheme = {
    root: {
      base: "relative h-full w-full",
    },
    item: {
      base: "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
      wrapper: {
        on: "w-full flex-shrink-0 transform cursor-grab snap-center",
        off: "w-full flex-shrink-0 transform cursor-default snap-center",
      },
    },
    control: {
      base: "hidden", // Hide both controls
    },
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
    },
  };

  return (
    <>
      <MyNavbar />
      <div className="h-56 sm:h-64 xl:h-96">
        <Carousel theme={customCarouselTheme} slideInterval={1000}>
          <img
            className="h-full w-full object-cover"
            src="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/301/original/SylviaDoe-BookshoporgBanner-2048x600-8650-final-v1_1_.jpg?1728402786"
            alt="..."
          />

          <img
            className="h-full w-full object-cover"
            src="https://cdn0.fahasa.com/media/magentothem/banner7/BannerHomePage_TrangCardGame_SlideBanner_840x320_2.jpg"
            alt="..."
          />
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="..."
          />
          <img
            className="h-full w-full object-cover"
            src="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/300/original/Hur_BOTOK_Bookshop.org_2048x600.jpg?1728402649"
            alt="..."
          />
        </Carousel>
      </div>

      <BookPanel books={newBooksData} title="New Books" viewMore="/search" />
      <BookPanel
        books={eduBooksData}
        title="Education"
        viewMore="/search?category=Education"
      />
      <BookPanel
        books={childBooksData}
        title="Children"
        viewMore="/search?category=Children"
      />
      <MySection>
        <h1 className="text-2xl font-bold">Find Us At</h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5424.543711115077!2d108.25521433455229!3d15.975384573863058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2sVietnam%20-%20Korea%20University%20of%20Information%20and%20Communication%20Technology!5e0!3m2!1sen!2s!4v1729588110998!5m2!1sen!2s"
          className="h-80 w-full"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </MySection>
      <MyFooter />
    </>
  );
}
