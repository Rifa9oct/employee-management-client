import Bannar from "../Bannar";
import Footer from "../Footer";
import InTach from "../InTach";
import Recognize from "../Recognize";

import Testimonials from "../Testimonials";
import Services from "../services/Services";




const Home = () => {
    return (
        <div>
            <Bannar></Bannar>
            <Services></Services>
            <Testimonials></Testimonials>
            <InTach></InTach>
            <Recognize></Recognize>
            <Footer></Footer>
        </div>
    );
};

export default Home;