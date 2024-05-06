import Carousel from '../../components/Carousel/Carrosel';
const Home = () => {
   return (
      <div className="py-2.5 min-h-[calc(100vh-70px)]">
         <div className="container bg-body">
            {' '}
            <Carousel />
         </div>
         <div>{/* <div>Reviews</div> */}</div>
      </div>
   );
};

export default Home;
